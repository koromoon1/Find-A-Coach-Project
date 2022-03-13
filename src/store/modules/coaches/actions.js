export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    // Send data to firebase
    // with fetch function. It take a string url
    const response = await fetch(
      `https://myproject1-b5913-default-rtdb.firebaseio.com/coaches/${userId}.json`,
      // firebase need to add '.json' at the end
      {
        method: 'PUT', // default is get
        // PUT: overwrite existing data || create if doesn't exist
        // Post: a new entry will be added all the time
        // We only want to have one coach entry  per user, so use PUT here
        body: JSON.stringify(coachData),
        // ↑ conver coachData into JSON format
      }
    );

    // One solution: use then()
    // .then();
    // then: execute once the promise is done

    // The other solution: async await
    // 1. add 'async' in front of method name
    // 2. add 'await' in front of promise
    // 3. store response in const (only be stored after promise is done)

    // The next line only execute when the above request is done

    const responseData = await response.json();
    console.log(responseData);
    // ↑ response object has a json() method, which will also return a promise
    // after we await that, we got the passed response data
    // for here, we don't need response data because we are registing a new coach

    // Error handling
    // Then check if the response is ok (response has a ok field)
    if (!response.ok) {
      // error handling
      const error = new Error(responseData.message || 'Failed to register!');
      throw error;
      // ↑ the component dispatching this will ba able to handle this threw error
    }

    // After all the aboves are done
    context.commit('registerCoach', {
      // commit all coach data and user id
      ...coachData,
      id: userId,
    });
  },

  // send request to load data from firebase
  async loadCoaches(context) {
    const response = await fetch(
      `https://myproject1-b5913-default-rtdb.firebaseio.com/coaches.json`
    ); // fetch all coaches

    const responseData = await response.json();
    // console.log(responseData);

    if (!response.ok) {
      // error handling
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
      // ↑ the component dispatching this will ba able to handle this threw error
    }

    // Formatting coach data
    const coaches = [];
    // get each coach id
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };

      coaches.push(coach);
    }
    context.commit('setCoaches', coaches);
  },
};
