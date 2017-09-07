import { Selector } from 'testcafe';

fixture `Login`
	.page `http://localhost:8000/#/user/login`;

test('Login', async t => {
  // Get the task input
  // This selector looks for a root element of the TodoTextInput component inside the Header component
	const userInput = Selector('#userName');
	const passInput = Selector('#password');
	const submitButton = Selector('button[type="submit"]');

  // Enter the text for the new todo list item
  await t.typeText(userInput, 'xxxx');
  await t.typeText(passInput, 'xxxx');
	await t.click(submitButton);
  // Check the number of todo list items and text in the new task
});
