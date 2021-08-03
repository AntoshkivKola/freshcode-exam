function sum (a, b) {
  return a + b;
}

test('add 10 to 20 to be 30', () => {
  expect(sum(10, 20)).toBe(30);
});

 test('add 10:string to 20:string to be 30:string', () => {
  expect(sum('10', '20')).toBe('30');
}); 
