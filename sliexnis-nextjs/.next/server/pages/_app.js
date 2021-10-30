(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./contexts/AuthContext.js":
/*!*********************************!*\
  !*** ./contexts/AuthContext.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useAuth": () => (/* binding */ useAuth),
/* harmony export */   "AuthProvider": () => (/* binding */ AuthProvider)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../firebase */ "./firebase.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "D:\\Dev\\sliexnis\\sliexnis-nextjs\\contexts\\AuthContext.js";



const AuthContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext();
function useAuth() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(AuthContext);
}
function AuthProvider({
  children
}) {
  const {
    0: currentUser,
    1: setCurrentUser
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const {
    0: loading,
    1: setLoading
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const {
    0: classID,
    1: setClassID
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");

  function signup(email, password, username) {
    _firebase__WEBPACK_IMPORTED_MODULE_1__.firestore.collection("usernames").doc(username).set({
      registered: true
    });
    return _firebase__WEBPACK_IMPORTED_MODULE_1__.auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return _firebase__WEBPACK_IMPORTED_MODULE_1__.auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return _firebase__WEBPACK_IMPORTED_MODULE_1__.auth.signOut();
  }

  function resetPassword(email) {
    return _firebase__WEBPACK_IMPORTED_MODULE_1__.auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const unsubscribe = _firebase__WEBPACK_IMPORTED_MODULE_1__.auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    classID,
    setClassID
  };
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(AuthContext.Provider, {
    value: value,
    children: !loading && children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 64,
    columnNumber: 5
  }, this);
}

/***/ }),

/***/ "./firebase.ts":
/*!*********************!*\
  !*** ./firebase.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "auth": () => (/* binding */ auth),
/* harmony export */   "firestore": () => (/* binding */ firestore),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/compat/app */ "firebase/compat/app");
/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_compat_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/compat/auth */ "firebase/compat/auth");
/* harmony import */ var firebase_compat_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_compat_auth__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_compat_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/compat/firestore */ "firebase/compat/firestore");
/* harmony import */ var firebase_compat_firestore__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase_compat_firestore__WEBPACK_IMPORTED_MODULE_2__);



const firebaseConfig = {
  apiKey: "AIzaSyBMqo4Rcv_wlLeaWQS7SDICRsErtXCRs-o",
  authDomain: "skola-29c56.firebaseapp.com",
  projectId: "skola-29c56",
  storageBucket: "skola-29c56.appspot.com",
  messagingSenderId: "186265093215",
  appId: "1:186265093215:web:e30702c571cf7c640707ea"
};
const app = !(firebase_compat_app__WEBPACK_IMPORTED_MODULE_0___default().apps.length) ? firebase_compat_app__WEBPACK_IMPORTED_MODULE_0___default().initializeApp(firebaseConfig) : firebase_compat_app__WEBPACK_IMPORTED_MODULE_0___default().app();
const analytics = (firebase_compat_app__WEBPACK_IMPORTED_MODULE_0___default().analytics);
const auth = app.auth();
const firestore = app.firestore();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _styles_globals_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/globals.scss */ "./styles/globals.scss");
/* harmony import */ var _styles_globals_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../contexts/AuthContext */ "./contexts/AuthContext.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "D:\\Dev\\sliexnis\\sliexnis-nextjs\\pages\\_app.tsx";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





function MyApp({
  Component,
  pageProps
}) {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_1__.AuthProvider, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(Component, _objectSpread({}, pageProps), void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 7,
    columnNumber: 5
  }, this);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);

/***/ }),

/***/ "./styles/globals.scss":
/*!*****************************!*\
  !*** ./styles/globals.scss ***!
  \*****************************/
/***/ (() => {



/***/ }),

/***/ "firebase/compat/app":
/*!**************************************!*\
  !*** external "firebase/compat/app" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("firebase/compat/app");

/***/ }),

/***/ "firebase/compat/auth":
/*!***************************************!*\
  !*** external "firebase/compat/auth" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("firebase/compat/auth");

/***/ }),

/***/ "firebase/compat/firestore":
/*!********************************************!*\
  !*** external "firebase/compat/firestore" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("firebase/compat/firestore");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFO0FBTlksQ0FBdkI7QUFRQSxNQUFNQyxHQUFHLEdBQUcsQ0FBQ1Isd0VBQUQsR0FBd0JBLHdFQUFBLENBQXVCQyxjQUF2QixDQUF4QixHQUFpRUQsOERBQUEsRUFBN0U7QUFDQSxNQUFNWSxTQUFTLEdBQUdaLHNFQUFsQjtBQUNPLE1BQU1sQyxJQUFJLEdBQUcwQyxHQUFHLENBQUMxQyxJQUFKLEVBQWI7QUFDQSxNQUFNQyxTQUFTLEdBQUd5QyxHQUFHLENBQUN6QyxTQUFKLEVBQWxCO0FBQ1AsaUVBQWV5QyxHQUFmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJBO0FBRUE7OztBQUVBLFNBQVNLLEtBQVQsQ0FBZTtBQUFFQyxFQUFBQSxTQUFGO0FBQWFDLEVBQUFBO0FBQWIsQ0FBZixFQUFtRDtBQUNqRCxzQkFDRSw4REFBQywrREFBRDtBQUFBLDJCQUNFLDhEQUFDLFNBQUQsb0JBQWVBLFNBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFERjtBQUtEOztBQUNELGlFQUFlRixLQUFmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQSIsInNvdXJjZXMiOlsid2VicGFjazovL3NsaWV4bmlzLW5leHRqcy8uL2NvbnRleHRzL0F1dGhDb250ZXh0LmpzIiwid2VicGFjazovL3NsaWV4bmlzLW5leHRqcy8uL2ZpcmViYXNlLnRzIiwid2VicGFjazovL3NsaWV4bmlzLW5leHRqcy8uL3BhZ2VzL19hcHAudHN4Iiwid2VicGFjazovL3NsaWV4bmlzLW5leHRqcy9leHRlcm5hbCBcImZpcmViYXNlL2NvbXBhdC9hcHBcIiIsIndlYnBhY2s6Ly9zbGlleG5pcy1uZXh0anMvZXh0ZXJuYWwgXCJmaXJlYmFzZS9jb21wYXQvYXV0aFwiIiwid2VicGFjazovL3NsaWV4bmlzLW5leHRqcy9leHRlcm5hbCBcImZpcmViYXNlL2NvbXBhdC9maXJlc3RvcmVcIiIsIndlYnBhY2s6Ly9zbGlleG5pcy1uZXh0anMvZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovL3NsaWV4bmlzLW5leHRqcy9leHRlcm5hbCBcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0LCB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGF1dGgsIGZpcmVzdG9yZSB9IGZyb20gXCIuLi9maXJlYmFzZVwiO1xyXG5cclxuY29uc3QgQXV0aENvbnRleHQgPSBSZWFjdC5jcmVhdGVDb250ZXh0KCk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXNlQXV0aCgpIHtcclxuICByZXR1cm4gdXNlQ29udGV4dChBdXRoQ29udGV4dCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBBdXRoUHJvdmlkZXIoeyBjaGlsZHJlbiB9KSB7XHJcbiAgY29uc3QgW2N1cnJlbnRVc2VyLCBzZXRDdXJyZW50VXNlcl0gPSB1c2VTdGF0ZSgpO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xyXG4gIGNvbnN0IFtjbGFzc0lELCBzZXRDbGFzc0lEXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICBmdW5jdGlvbiBzaWdudXAoZW1haWwsIHBhc3N3b3JkLCB1c2VybmFtZSkge1xyXG4gICAgZmlyZXN0b3JlLmNvbGxlY3Rpb24oXCJ1c2VybmFtZXNcIikuZG9jKHVzZXJuYW1lKS5zZXQoe1xyXG4gICAgICByZWdpc3RlcmVkOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYXV0aC5jcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQoZW1haWwsIHBhc3N3b3JkKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGxvZ2luKGVtYWlsLCBwYXNzd29yZCkge1xyXG4gICAgcmV0dXJuIGF1dGguc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQoZW1haWwsIHBhc3N3b3JkKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGxvZ291dCgpIHtcclxuICAgIHJldHVybiBhdXRoLnNpZ25PdXQoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlc2V0UGFzc3dvcmQoZW1haWwpIHtcclxuICAgIHJldHVybiBhdXRoLnNlbmRQYXNzd29yZFJlc2V0RW1haWwoZW1haWwpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdXBkYXRlRW1haWwoZW1haWwpIHtcclxuICAgIHJldHVybiBjdXJyZW50VXNlci51cGRhdGVFbWFpbChlbWFpbCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB1cGRhdGVQYXNzd29yZChwYXNzd29yZCkge1xyXG4gICAgcmV0dXJuIGN1cnJlbnRVc2VyLnVwZGF0ZVBhc3N3b3JkKHBhc3N3b3JkKTtcclxuICB9XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCB1bnN1YnNjcmliZSA9IGF1dGgub25BdXRoU3RhdGVDaGFuZ2VkKCh1c2VyKSA9PiB7XHJcbiAgICAgIHNldEN1cnJlbnRVc2VyKHVzZXIpO1xyXG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB1bnN1YnNjcmliZTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IHZhbHVlID0ge1xyXG4gICAgY3VycmVudFVzZXIsXHJcbiAgICBsb2dpbixcclxuICAgIHNpZ251cCxcclxuICAgIGxvZ291dCxcclxuICAgIHJlc2V0UGFzc3dvcmQsXHJcbiAgICB1cGRhdGVFbWFpbCxcclxuICAgIHVwZGF0ZVBhc3N3b3JkLFxyXG4gICAgY2xhc3NJRCxcclxuICAgIHNldENsYXNzSUQsXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxBdXRoQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17dmFsdWV9PlxyXG4gICAgICB7IWxvYWRpbmcgJiYgY2hpbGRyZW59XHJcbiAgICA8L0F1dGhDb250ZXh0LlByb3ZpZGVyPlxyXG4gICk7XHJcbn1cclxuIiwiaW1wb3J0IGZpcmViYXNlIGZyb20gXCJmaXJlYmFzZS9jb21wYXQvYXBwXCI7XHJcbmltcG9ydCBcImZpcmViYXNlL2NvbXBhdC9hdXRoXCI7XHJcbmltcG9ydCBcImZpcmViYXNlL2NvbXBhdC9maXJlc3RvcmVcIjtcclxuXHJcblxyXG5jb25zdCBmaXJlYmFzZUNvbmZpZyA9IHtcclxuICAgIGFwaUtleTogXCJBSXphU3lCTXFvNFJjdl93bExlYVdRUzdTRElDUnNFcnRYQ1JzLW9cIixcclxuICAgIGF1dGhEb21haW46IFwic2tvbGEtMjljNTYuZmlyZWJhc2VhcHAuY29tXCIsXHJcbiAgICBwcm9qZWN0SWQ6IFwic2tvbGEtMjljNTZcIixcclxuICAgIHN0b3JhZ2VCdWNrZXQ6IFwic2tvbGEtMjljNTYuYXBwc3BvdC5jb21cIixcclxuICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjE4NjI2NTA5MzIxNVwiLFxyXG4gICAgYXBwSWQ6IFwiMToxODYyNjUwOTMyMTU6d2ViOmUzMDcwMmM1NzFjZjdjNjQwNzA3ZWFcIlxyXG4gIH07XHJcbmNvbnN0IGFwcCA9ICFmaXJlYmFzZS5hcHBzLmxlbmd0aCA/IGZpcmViYXNlLmluaXRpYWxpemVBcHAoZmlyZWJhc2VDb25maWcpIDogZmlyZWJhc2UuYXBwKCk7XHJcbmNvbnN0IGFuYWx5dGljcyA9IGZpcmViYXNlLmFuYWx5dGljcztcclxuZXhwb3J0IGNvbnN0IGF1dGggPSBhcHAuYXV0aCgpO1xyXG5leHBvcnQgY29uc3QgZmlyZXN0b3JlID0gYXBwLmZpcmVzdG9yZSgpO1xyXG5leHBvcnQgZGVmYXVsdCBhcHA7XHJcbiIsImltcG9ydCBcIi4uL3N0eWxlcy9nbG9iYWxzLnNjc3NcIjtcbmltcG9ydCB0eXBlIHsgQXBwUHJvcHMgfSBmcm9tIFwibmV4dC9hcHBcIjtcbmltcG9ydCB7IEF1dGhQcm92aWRlciB9IGZyb20gXCIuLi9jb250ZXh0cy9BdXRoQ29udGV4dFwiO1xuXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSB7XG4gIHJldHVybiAoXG4gICAgPEF1dGhQcm92aWRlcj5cbiAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICA8L0F1dGhQcm92aWRlcj5cbiAgKTtcbn1cbmV4cG9ydCBkZWZhdWx0IE15QXBwO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmlyZWJhc2UvY29tcGF0L2FwcFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaXJlYmFzZS9jb21wYXQvYXV0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaXJlYmFzZS9jb21wYXQvZmlyZXN0b3JlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTsiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VDb250ZXh0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJhdXRoIiwiZmlyZXN0b3JlIiwiQXV0aENvbnRleHQiLCJjcmVhdGVDb250ZXh0IiwidXNlQXV0aCIsIkF1dGhQcm92aWRlciIsImNoaWxkcmVuIiwiY3VycmVudFVzZXIiLCJzZXRDdXJyZW50VXNlciIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiY2xhc3NJRCIsInNldENsYXNzSUQiLCJzaWdudXAiLCJlbWFpbCIsInBhc3N3b3JkIiwidXNlcm5hbWUiLCJjb2xsZWN0aW9uIiwiZG9jIiwic2V0IiwicmVnaXN0ZXJlZCIsImNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZCIsImxvZ2luIiwic2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQiLCJsb2dvdXQiLCJzaWduT3V0IiwicmVzZXRQYXNzd29yZCIsInNlbmRQYXNzd29yZFJlc2V0RW1haWwiLCJ1cGRhdGVFbWFpbCIsInVwZGF0ZVBhc3N3b3JkIiwidW5zdWJzY3JpYmUiLCJvbkF1dGhTdGF0ZUNoYW5nZWQiLCJ1c2VyIiwidmFsdWUiLCJmaXJlYmFzZSIsImZpcmViYXNlQ29uZmlnIiwiYXBpS2V5IiwiYXV0aERvbWFpbiIsInByb2plY3RJZCIsInN0b3JhZ2VCdWNrZXQiLCJtZXNzYWdpbmdTZW5kZXJJZCIsImFwcElkIiwiYXBwIiwiYXBwcyIsImxlbmd0aCIsImluaXRpYWxpemVBcHAiLCJhbmFseXRpY3MiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyJdLCJzb3VyY2VSb290IjoiIn0=