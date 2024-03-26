import { useState } from 'react';
import {Link} from 'react-router-dom'
// import { ic_demo_backend } from 'declarations/ic_demo_backend';

function App() {
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
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <h1>路由练习</h1>
      <nav>
        {/* link 页面展示时，是个a标签 */}
        {/* <Link className ='link' to='/Tab1'> Tab1</Link>  
        <Link className = 'link' to='/Tab2'> Tab2 </Link>   */}
      </nav> 
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">new Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default App;
