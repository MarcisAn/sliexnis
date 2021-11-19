import datetime
import time

import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials
import requests
import discord_bot

classID = "LzgGyWBOVDpLrZLNCyxV"

k = open('telegram_key.txt', 'r')
telegram_key = k.read()
p = open("pirmagrupa.txt", "r")
pirmagrupa= p.read()
o = open("otragrupa.txt", "r")
otragrupa = o.read()
cred = credentials.Certificate("keys.json")
firebaseapp = firebase_admin.initialize_app(cred)
firestore = firebase_admin.firestore.client(app=firebaseapp)
tasklist = firestore.collection("classes").document(classID).collections()
*_, last = tasklist

def parse_time(time):
    return datetime.datetime.strptime(time, "%Y-%m-%d %H:%M")

sub_docs = last.stream()
todaystasks = []
for doc in sub_docs:
    task = doc.to_dict()
    print(task["priorityTime"])
    now = datetime.datetime.now().date()
    task_date = parse_time(task["priorityTime"]).date()
    if now == task_date:
        todaystasks.append(task)

onlinelessons = []
tests = []
tasks = []
for j in todaystasks:
    if j["type"] == "task":
        tasks.append(j)
    if j["type"] == "online-lesson":
        onlinelessons.append(j)
    if j["type"] == "test":
        tests.append(j)
#print(tasks)
#print(tests)
#print(onlinelessons)
#print(todaystasks)


months = [
      "janv.",
      "febr.",
      "mart",
      "apr.",
      "maijs",
      "jūn.",
      "jūl.",
      "aug.",
      "sept.",
      "okt.",
      "nov.",
      "dec.",
    ]
def task_print(tasks, isOnlineLesson):
    output = ""
    for z in tasks:
        hour = parse_time(z["priorityTime"]).time().hour
        minute = parse_time(z["priorityTime"]).time().minute
        if len(str(hour)) == 1:
            hour = "0" + str(hour)
        if len(str(minute)) == 1:
            minute = "0" + str(minute)
        if isOnlineLesson:
            subjects = firestore.collection("classes").document(classID).collection("subjects").where("name", "==", z["subject"])
            docs = subjects.stream()
            subject_data = ""
            for doc in docs:
                subject_data = doc.to_dict()#This is assuming there will be only one document maching subject name, if not the last one will be picked
            output = output + "⚈"+str(hour) +":"+ str(minute)+" - "+z["subject"] +":\n" + z["text"] +" "+subject_data["onlineURL"] +"\n--------------\n"

        else:
            output = output + "⚈"+str(hour) +":"+ str(minute)+" - "+z["subject"] +":\n" + z["text"] + "\n--------------\n"
    return output

message = "Labrīt! Šodien:\n--------------\n"
if(len(tasks)==0 and len(tests)==0  and len(onlinelessons)==0):
    message = message + "\U0001F573 nav atrasts neviens ieraksts dienasgrāmatā.*"
else:
    if len(tasks) == 0:
        message = message + "\U0001F573 nav atrasts neviens uzdevums\n--------------\n"
    else:
        if len(tasks) == 1:
            message = message + "\U0001F573 atrasts " + str(len(tasks)) + " uzdevums:\n--------------\n"
        else:
            message = message + "\U0001F573 atrasti " + str(len(tasks)) + " uzdevumi:\n--------------\n"
        message = message + task_print(tasks, False)
    if len(tests) == 0:
        message = message + "\U0001F573 Nav atrasts neviens kontroldarbs\n--------------\n"
    else:
        message = message + "\U0001F573 Atrasti " + str(len(tests)) + " kontroldarbi:\n--------------\n"
        if len(tests) == 1:
            message = message + "\U0001F573 Atrasts " + str(len(tests)) + " kontroldarbs:\n--------------\n"
        else:
            message = message + "\U0001F573 Atrasti " + str(len(tests)) + " kontroldarbi:\n--------------\n"
        message = message + task_print(tests, False)
    if len(onlinelessons) == 0:
        message = message + "\U0001F573 Nav atrasta neviena tiešsaistes stunda\n--------------\n"
    else:
        if len(onlinelessons)==1:
            message = message + "\U0001F573 Atrasta " + str(len(onlinelessons)) + " tiešsaistes stunda:\n--------------\n"
        else:
            message = message + "\U0001F573 Atrastas " + str(len(onlinelessons)) + " tiešsaistes stundas:\n--------------\n"
        message = message + task_print(onlinelessons,True)

#908824264
print(message)
params = {"chat_id": pirmagrupa, "text":message, "disable_web_page_preview": True }
r = requests.get('https://api.telegram.org/bot'+telegram_key+'/sendMessage', params=params)
params = {"chat_id": otragrupa, "text":message, "disable_web_page_preview": True }
r = requests.get('https://api.telegram.org/bot'+telegram_key+'/sendMessage', params=params)

print(r.content)
print(message)
discord_bot.run(message)
if len(todaystasks) == 0:
    quit()
else:
    while(True):
        for x in todaystasks:
            now = datetime.datetime.now()
            now = now + datetime.timedelta(minutes = 10)
            print(now)
            print(x["priorityTime"])
            if now.hour ==parse_time(x["priorityTime"]).hour and now.minute ==parse_time(x["priorityTime"]).minute:
                subjects = firestore.collection("classes").document(classID).collection("subjects").where("name", "==",
                                                                                                          x["subject"])
                docs = subjects.stream()
                subject_data = ""
                for doc in docs:
                    subject_data = doc.to_dict()  # This is assuming there will be only one document maching subject name, if not the last one will be picked
                message = x["subject"] + " pēc 10 minūtēm "+ subject_data["onlineURL"]
                params = {"chat_id": pirmagrupa, "text": message, "disable_web_page_preview": True}
                r = requests.get('https://api.telegram.org/bot' + telegram_key + '/sendMessage', params=params)
                params = {"chat_id": otragrupa, "text": message, "disable_web_page_preview": True}
                r = requests.get('https://api.telegram.org/bot' + telegram_key + '/sendMessage', params=params)
                print(r.content)
                print(message)
                discord_bot.run(message)
        time.sleep(60)