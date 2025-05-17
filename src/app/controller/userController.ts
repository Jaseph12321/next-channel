import { createUserData, userData, userParam } from "../model/model";



export async function createUser(user:createUserData){
  const response = await fetch(`/api/user`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)

  });

  console.log(response);
  const data = response.json();
  return data;
}


export async function getUser(user: userParam){

  console.log('userController', user);

  const params = new URLSearchParams({id: user.id,name: user.name});

  const response = await fetch(`/api/user?id=${params.get('id')}&name=${params.get('name')} `, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  console.log(response);
  const data = await response.json();
  console.log(`hahahahahahaahhah ${data}`);
  return data;
}

export async function updateUser(user:userData){
  const response = await fetch(`/api/user/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  });

  console.log(response);
  const data = response.json();
  return data;
}