import { useState } from 'react';
// import { ic_demo_backend } from 'declarations/ic_demo_backend';

function Page1() {
  const [greeting, setGreeting] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    // const name = event.target.elements.name.value;
    // ic_demo_backend.greet(name).then((greeting) => {
    //   setGreeting(greeting);
    // });
    return false;
  }

  return (
    <main>
      Page1
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">new Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default Page1;
