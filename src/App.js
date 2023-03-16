import React from "react";
import Sidebar from "react-sidebar";
import { useInView } from 'react-intersection-observer';


const ListItem = (props) => {
  return (
    <a href={props.link}>
      <li className="flex items-center h-10 rounded-md group hover:shadow-md hover:rounded-md hover:bg-gray-600 p-2">
        <i className={`mr-2 ${props.icon}`}></i>
        <span
          className={`opacity-0 transition-opacity duration-200 ease-in-out delay-200 ${
            props.hideText ? "invisible" : "visible opacity-100"
          }`}
        >
          {props.text}
        </span>
      </li>
    </a>
  );
};

const Name = () => {
  return (
    <div className='flex justify-center'>
      <h1 className='text-6xl'>Stefan Hall</h1>
    </div>
  )

}

const JobTitle = () => {
  return (
    <div className='flex justify-center'>
      <h1 className="font-serif text-white text-xl">Site Reliability Engineer</h1> 
    </div>
  )

}

const Info = () => {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const translateClass = inView ? 'translate-x-0 duration-1000' : 'translate-x-full duration-1000';
  return (
    <div
      ref={ref}
      className={`w-2/5 h-64 flex flex-col justify-around mt-36 mx-auto transform skew-x-12 bg-gray-400 transition-transform duration-500 ease-out ${translateClass} shadow-xl`}
      style={{ boxShadow: '-40px 40px 0px 0px rgba(0, 0, 0, 0.75)' }}
    >
      <Name />
      <JobTitle />
    </div>
  );
}



const ExternalSidebarContent = (props) => {
  const { items, collapsed } = props;
  const sidebarWidth = collapsed ? "3.55rem" : "12rem";
  return (
    <div
      className={`w-48 ml-2 ${
        collapsed ? "transition-width duration-200" : "transition-width duration-200"
      }`}
      style={{ width: sidebarWidth }}
      onMouseEnter={() => props.setCollapsed(false)}
      onMouseLeave={() => props.setCollapsed(true)}
    >
      <div className="block text-right py-2 px-3">
        <div className="rounded-md overflow-hidden">
          <button onClick={props.toggleCollapsed}>
            <i className="fa-solid fa-bars text-4xl"></i>
          </button>
          <TransitionedContent collapsed={collapsed} />
        </div>
      </div>
      <div className="flex justify-between">
        <ul className={` flex-col ${collapsed ? "w-full" : ""}`}>
          {items.map((item) => (
            <ListItem
              link={item.link}
              icon={item.icon}
              text={item.text}
              hideText={props.collapsed}
              key={item.text}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

const TransitionedContent = (props) => {
  return (
    <div
      id="transitioned"
      className={`transition-all duration-2000 ease-in-out ${
        props.collapsed ? "ml-48" : "ml-0"
      }`}
    >
      <p className="text-xl underline font-bold">Stefan</p><p className="text-xl underline font-bold"> Hall</p>
    </div>
  );
};


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,
      collapsed: true,
    };
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  toggleCollapsed() {
    this.setState((prevState) => ({ collapsed: !prevState.collapsed }));
  }

  render() {
    const sidebarWidth = this.state.collapsed ? "ml-20" : "ml-54";
    const items = [
      {
        link: "https://www.freecodecamp.org/stefan_hall",
        icon: "fa-brands fa-free-code-camp text-4xl",
        text: "Free Code Camp",
      },
      {
        link: "https://github.com/stefanhall2704",
        icon: "fa-brands fa-github text-4xl",
        text: "GitHub",
      },
      {
        link: "https://www.linkedin.com/in/stefan-hall-b4787b13b/",
        icon: "fa-brands fa-linkedin text-4xl",
        text: "LinkedIn",
      },
      {
        link: "https://codepen.io/stefan_hall",
        icon: "fa-brands fa-codepen text-4xl",
        text:"Codepen",
      },
    ];

    return (
      <Sidebar
        sidebar={
          <ExternalSidebarContent
            items={items}
            collapsed={this.state.collapsed}
            toggleCollapsed={this.toggleCollapsed}
            setCollapsed={(value) => this.setState({ collapsed: value })}
          />
        }
        open={this.state.sidebarOpen}
        onSetOpen={() => this.setState({ sidebarOpen: true })}
        styles={{ sidebar: { background: "gray" } }}
      >
      <div className="transition-all duration-500 ease-in-out">
        <header className="text-white gray h-12 shadow-xl">
          <div className={`${sidebarWidth}} ${this.state.collapsed ? 'transition-width duration-200' : 'transition-width duration-200'}`}></div>
        </header>
        <div id="main" className={`${this.state.collapsed ? 'ml-20 duration-200' : 'ml-54 duration-200'}`}>
          <Info />
        </div>
      </div>
      </Sidebar>
    );
  }
}

export default App;