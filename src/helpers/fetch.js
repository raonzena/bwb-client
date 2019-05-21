// localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTgwNjE3NTIwMDAsImRhdGEiOiJ0ZXN0NiIsImlzTG9naW4iOnRydWUsImV4cCI6MTU1ODE0ODE1MjAwMH0.pzw7IlVcnHFf24XqiYtxp4Lw9KDcF7ZoZLLI9dcBxBQ')

//login fetch
async function fetchLogin(loginUser) {
  return await fetch("http://localhost:3000/login", {
    method: "POST",
    body: JSON.stringify(loginUser),
    headers: { "Content-Type": "application/json" }
  });
}

//signup fetch
async function fetchSignup(user) {
  return await fetch("http://localhost:3000/signup", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  });
}
//signup idCheck fetch
async function fetchSignup_IdCheck(id) {
  return await fetch(`http://localhost:3000/id/check?id=${id}`, {
    method: "GET"
  });
}
//signup nicknameCheck fetch
async function fetchSignup_NickNameCheck(nick_name) {
  return await fetch(
    `http://localhost:3000/nickname/check?nick_name=${nick_name}`,
    {
      method: "GET"
    }
  );
}
// logout fetch
async function fetchLogout(token) {
  return await fetch("http://localhost:3000/logout", {
    method: "GET",
    headers: {
      authorization: token
    }
  });
}
//미팅 디테일 fetch
async function fetchMeetingDetail(placeId, index) {
  let token = localStorage.getItem("token");
  console.log(token);

  if (token === null) {
    token = "";
  }
  return await fetch(
    `http://localhost:3000/meetings/detail?meetingId=${index}&placeId=${placeId}`,
    {
      method: "GET",
      headers: {
        authorization: token
      }
    }
  );
}

async function fetchMeetingList(placeId) {
  return await fetch(
    "http://localhost:3000/meetings/list/region?q=" + placeId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}

//참가 등록
async function addMember(meetingId) {
  let token = localStorage.getItem("token");
  return await fetch(`http://localhost:3000/meetings/new/member`, {
    method: "POST",
    body: JSON.stringify({ meetingId: meetingId }),
    headers: {
      "Content-Type": "application/json",
      authorization: token
    }
  });
}

//모임 삭제
async function deleteMeeting(meetingId) {
  let token = localStorage.getItem("token");
  return await fetch(`http://localhost:3000/meetings/delete/meeting`, {
    method: "POST",
    body: JSON.stringify({ meetingId: meetingId }),
    headers: {
      "Content-Type": "application/json",
      authorization: token
    }
  });
}

//참가 취소
async function cancelMember(meetingId) {
  let token = localStorage.getItem("token");
  return await fetch(`http://localhost:3000/meetings/cancel/member`, {
    method: "POST",
    body: JSON.stringify({ meetingId: meetingId }),
    headers: {
      "Content-Type": "application/json",
      authorization: token
    }
  });
}

async function fetchNickname() {
  let token = localStorage.getItem("token");
  return await fetch(`http://localhost:3000/userNickname`, {
    method: "GET",
    headers: {
      authorization: token
    }
  });
}

async function createNewMeeting(data) {
  let token = localStorage.getItem("token");
  return await fetch(`http://localhost:3000/meetings/new/meeting`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      authorization: token
    }
  });
}

module.exports = {
  fetchLogin,
  fetchSignup,
  fetchSignup_IdCheck,
  fetchSignup_NickNameCheck,
  fetchLogout,
  fetchMeetingDetail,
  addMember,
  deleteMeeting,
  cancelMember,
  fetchNickname,
  createNewMeeting,
  fetchMeetingList
};
