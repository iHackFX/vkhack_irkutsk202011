import axios from "axios";
export function getUserConversations(userId, setUserConversations) {
  var config = {
    method: "get",
    url:
      "https://cors-anywhere.herokuapp.com/" +
      process.env.REACT_APP_BACKEND_URL +
      "/?type=getUserConversations&user_id=" +
      userId,
    headers: {
      Origin: "http://localhost:10888",
      "Access-Control-Allow-Origin": "*",
    },
  };
  axios(config)
    .then(function (response) {
      if (response.data !== undefined) {
        setUserConversations(response.data);
      }
    })
    .catch(function (error) {});
}
export function getPubConversations(setPubConversations, subjects) {
  var config = {
    method: "get",
    url:
      "https://cors-anywhere.herokuapp.com/" +
      process.env.REACT_APP_BACKEND_URL +
      "/?type=getPubConversations" +
      (subjects !== "" ? "&subject=" + subjects : ""),
    headers: {
      Origin: "http://localhost:10888",
      "Access-Control-Allow-Origin": "*",
    },
  };
  axios(config)
    .then(function (response) {
      if (response.data !== undefined) {
        setPubConversations(response.data);
      }
    })
    .catch(function (error) {});
}

export function createConversation(userId, name, url, subject) {
  var config = {
    method: "get",
    url:
      "https://cors-anywhere.herokuapp.com/" +
      process.env.REACT_APP_BACKEND_URL +
      "/?type=insert&name=" +
      name +
      "&creator_id=" +
      userId +
      "&url=" +
      url +
      "&subject=" +
      subject,
    headers: {
      Origin: "http://localhost:10888",
      "Access-Control-Allow-Origin": "*",
    },
  };

  axios(config)
    .then(function (response) {
      if (response.data.status === "error") {
        return "error";
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function getUsers(userId, setUser) {
  var config = {
    method: "get",
    url:
      "https://cors-anywhere.herokuapp.com/" +
      process.env.REACT_APP_BACKEND_URL +
      "/?type=getUsers" +
      (userId !== null ? "&user_id=" + userId : ""),
    headers: {
      Origin: "http://localhost:10888",
      "Access-Control-Allow-Origin": "*",
    },
  };

  axios(config)
    .then(function (response) {
      if (response.data !== undefined) {
        setUser(response.data);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function addOrEditUser(userId, type, group) {
  var config = {
    method: "get",
    url:
      "https://cors-anywhere.herokuapp.com/" +
      process.env.REACT_APP_BACKEND_URL +
      "/?type=insert&user_id=" +
      userId +
      "&user_type=" +
      type +
      "&group=" +
      group,
    headers: {
      Origin: "http://localhost:10888",
      "Access-Control-Allow-Origin": "*",
    },
  };

  axios(config)
    .then(function (response) {
      if (response.data.status === "error") {
        return "error";
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function removeUser(userId) {
  var config = {
    method: "get",
    url:
      "https://cors-anywhere.herokuapp.com/" +
      process.env.REACT_APP_BACKEND_URL +
      "/?type=delete&user_id=" +
      userId,
    headers: {
      Origin: "http://localhost:10888",
      "Access-Control-Allow-Origin": "*",
    },
  };

  axios(config)
    .then(function (response) {
      if (response.data.status === "error") {
        return "error";
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
