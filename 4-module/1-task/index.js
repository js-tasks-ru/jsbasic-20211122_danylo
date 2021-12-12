function makeFriendsList(friends) {
  const ul = document.createElement('ul');

  for(const friend of friends) {
    ul.innerHTML += `<li>${friend.firstName} ${friend.lastName}</li>`;
  }

  return ul;
}
