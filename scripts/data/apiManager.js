const apiURL = "http://localhost:8088";

//// user functions
let loggedInUser = {}

export const getLoggedInUser = () => {
	return { ...loggedInUser };
}

export const logoutUser = () => {
	loggedInUser = {}
}

export const setLoggedInUser = (userObj) => {
	loggedInUser = userObj;
}

export const loginUser = (userObj) => {
	return fetch(`${apiURL}/users?name=${userObj.name}&email=${userObj.email}`)
		.then(response => response.json())
		.then(parsedUser => {
			//is there a user?
			if (parsedUser.length > 0) {
				setLoggedInUser(parsedUser[0]);
				return getLoggedInUser();
			} else {
				//no user
				return false;
			}
		})
}

export const registerUser = (userObj) => {
	return fetch(`${apiURL}/users`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(userObj)
	})
		.then(response => response.json())
		.then(parsedUser => {
			setLoggedInUser(parsedUser);
			return getLoggedInUser();
		})
}


///// snack functions

let snackCollection = [];

export const useSnackCollection = () => {
  //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //the spread operator makes quick work
  const snackCollectionCopy = [...snackCollection]
  return snackCollectionCopy;
}

export const getSnacks = () => {
	return fetch(`${apiURL}/snacks?_expand=inFlavor&_expand=type&_expand=shape&_expand=season&_embed=snackToppings`)
		.then(response => response.json())
		.then(parsedResponse => {
			snackCollection = parsedResponse
      console.log("snackCollection", snackCollection)
			return parsedResponse;
		})
}

export const getSingleSnack = (snackId) => {
	return fetch(`${apiURL}/snacks/${snackId}?_expand=inFlavor&_expand=type&_expand=shape&_expand=season&_embed=snackToppings`)
	.then(response => response.json())
  .then(parsedResponse => {
    const myBrainIsMush = getOptions(parsedResponse.id)
      .then(toppingsString => {
        parsedResponse.toppingsString = toppingsString
        // console.log("parsedResponse", parsedResponse)
        return parsedResponse
      })
    return myBrainIsMush
  })
  .then(newObject => newObject)
}

export const getOptions = (snackId) => {
  return fetch(`${apiURL}/snackToppings?snackId=${snackId}&_expand=topping`)
  .then(response => response.json())
  .then(response => {
    return toppingsFunction(response)
  })
}

export let allToppings = []
const toppingsFunction = (array) => {
  const filterOptions = array
  // console.log("filterOptions",filterOptions)
  if(filterOptions !== undefined){  
    for (const oneTopping of filterOptions){
    allToppings.push(oneTopping.topping.name)
  }
  // console.log("allToppings", allToppings.toString())
  return allToppings.join(", ")
  }
}

// todo fetch all toppings and render to dropdown menu
export const getToppings = () => {
  return fetch(`${apiURL}/toppings`)
  .then(response => response.json())
  .then(response => {
    renderMenu(response)
    return response 
  })
}


const renderMenu = (toppingsList) => {
  const menuTarget = document.querySelector(".form-select")
    let menuOptions = toppingsList.map(singleItem => {
      // singleItem.id = topping ID
      return `<option value="${singleItem.id}" name="${singleItem.name}">${singleItem.name}</option>`
    }).join("")
    // toppingList = toppingsList
    // console.log("toppingList", toppingList)
    menuTarget.innerHTML = menuOptions
}

// TODO Export fetch call that fetches snack toppings with expanded snacks
export const getSnackToppings = (toppingId) => {
  return fetch (`${apiURL}/snackToppings?toppingId=${toppingId}&_expand=snack`)
  .then(response => response.json())
  .then(parsedResponse => {
    return parsedResponse
  })
}

