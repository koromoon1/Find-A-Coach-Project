// global variable
// to make sure there is only 1 timer at a time
let timer;

export default {
  async signup(context, payload) {
    // Doc:
    // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password

    // ↓ !important: return the result of dispatching (which is the promise returned by auth)
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },
  // resuable auth action for both Sign Up and Log In
  async auth(context, payload) {
    // Doc:
    // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC1o6GoAc-d4e26h4XKrC04gTYDsnWrY4I';
    const mode = payload.mode;

    if (mode === 'login') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC1o6GoAc-d4e26h4XKrC04gTYDsnWrY4I';
    }

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.error.message || 'Failed to authenticate.'
      );
      throw error;
    }

    // set token expiration date
    // const expiresIn = 5000; // Test Data: 5 second
    const expiresIn = +responseData.expiresIn * 1000;
    // ↑ make expireseIn in milliseconds
    // ↑ adding a '+' to convert a string to number
    const expirationDate = new Date().getTime() + expiresIn;
    // ↑ get the expiration timestamp in millisecond (current time + duration)

    // Store Token & Id into Local Storage
    // Accessing browser built in API: Local Storage
    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);
    // Now the above data is stored into the browser, and normal refreshing will not clear them.

    // Set timer to log out when token expired
    timer = setTimeout(function () {
      // When token expired, log out
      context.dispatch('autoLogout');
    }, expiresIn); // after expiresIn duration, the function will execute

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      // tokenExpiration: expirationDate,
      // Token Expiration only metters when reload the page
    });
  },
  // ↓ try to log in when the app started (in App.vue)
  tryLogin(context) {
    // get stored log in data from local storage
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration'); // This is set as expiration date

    // get the time left for token (difference between expiration time and current time)
    const expiresIn = +tokenExpiration - new Date().getTime();

    // when token expired:
    if (expiresIn < 0) {
      // do not log in
      return;
    }
    // when token is still valid
    timer = setTimeout(function () {
      context.dispatch('autoLogout');
    }, expiresIn);

    // if the log in data exists, commit to log in automatically
    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        // tokenExpiration: null,
        // Token Expiration only metters when reload the page
      });
    }
  },
  logout(context) {
    // remove user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    // clear timer when log out
    clearTimeout(timer);

    // reuse 'setUser' mutation here
    context.commit('setUser', {
      token: null,
      userId: null,
      // tokenExpiration: null,
      // Token Expiration only metters when reload the page
    });
  },
  // Redirecting upon auto logout
  autoLogout(context) {
    // dispatch regular logout
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },
};
