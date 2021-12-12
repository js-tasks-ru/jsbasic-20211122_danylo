function showSalary(users, age) {
  result = users.filter(user => user.age <= age)
                .map(user => [user.name, user.balance].join(', '));

  return result.join('\n');
}
