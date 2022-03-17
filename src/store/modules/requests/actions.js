export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    // Send HTTP Request to firebase
    const response = await fetch(
      `https://myproject1-b5913-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      // '/requests': create a new 'requests' node on the firebase backend
      // all the requests sent will be stored in this node
      {
        method: 'POST', // will not overwrite, only add new data
        body: JSON.stringify(newRequest),
      }
    );

    // responseData includes a unique generated ID
    const responseData = await response.json();
    // console.log(responseData);

    if (!response.ok) {
      // error handling
      const error = new Error(
        responseData.message || 'Failed to send request!'
      );
      throw error;
      // ↑ the component dispatching this will ba able to handle this threw error
    }

    // Use this ID locally
    newRequest.id = responseData.name; // add id to newRequest object

    // save coachId at local, not to the server
    newRequest.coachId = payload.coachId;

    context.commit('addRequest', newRequest);
  },

  async fetchRequests(context) {
    // load requests for only the current user
    const coachId = context.rootGetters.userId;
    // get token by state
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://myproject1-b5913-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` +
        token
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch requests.'
      );
      throw error;
    }

    // Formatting Request Data
    const requests = [];
    // get each coach Id
    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };

      requests.push(request);
    }
    context.commit('setRequests', requests);
  },
};
