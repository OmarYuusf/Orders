const initState = {
  emailData: {},
  allProducts: [],
  carts: [],
  token: "",
  isLogged: false,
  userData: [],
  admin: false,
  orders: []
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_DATA":
      action.payload.map(counter => {
        counter.count = 1;
      });
      return {
        ...state,
        allProducts: action.payload
      };
    case "SET_TO_LIST":
      const resTwo = state.carts.filter(items => items.id == action.payload.id);
      if (resTwo.length > 0) {
        alert("مضاف بالفعل");
        return {
          ...state
        };
      } else {
        return {
          ...state,
          carts: state.carts.concat(action.payload)
        };
      }

    case "SAVE_CARTS":
      return {
        ...state,
        carts: action.payload
      };

    case "SAVE_TOKEN":
      const emailData = {
        username: action.emailData.name,
        password: action.emailData.password
      };
      return {
        ...state,
        token: action.payload,
        emailData: emailData
      };
    case "CHECK":
      
      return {
        ...state,
        token: action.payload
      };

    case "REMOVE_LOGGED":
      return {
        ...state,
        isLogged: false,
        admin: false
      };
    case "USER_DATA":
      return {
        ...state,
        userData: action.payload,
        isLogged: true
      }

    case "CHANGE_STATE":
      return {
        ...state,
        userData: action.payload,
        admin: true
      };
    case "DELETE_ITEMS":
      return {
        ...state,
        carts: state.carts.filter(items => items !== action.payload)
      };

    case "SET_ORDERS":
      return {
        ...state,
        orders: action.payload
      };

    case "DELETE_ORDER":
      return {
        ...state,
        carts: []
      };

    default:
      return state;
  }
};

export default reducer;
