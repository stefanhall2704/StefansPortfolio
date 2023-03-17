import React, { useState, useEffect } from "react";
import Sidebar from "react-sidebar";
import { useInView } from 'react-intersection-observer';


const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="flex justify-end mt-5-5 mr-10" >
      <ul className="flex space-x-4 text-white text-sm">
        <li><button onClick={openModal} className=" text-white  focus:outline-none">Contact</button></li>
      </ul>
    {isModalOpen && (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                <i class="fa-sharp fa-regular fa-address-card"></i>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Contact Information</h3>
                  <div className="mt-2">
                  <p className="text-sm text-gray-500">
                Name: Stefan Hall<br />
                Email: stefhall.2704@gmail.com<br />
                Number: (434)962-5099
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button onClick={closeModal} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-400 text-base font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
          Close
        </button>
      </div>
    </div>
  </div>
</div>
)}
</div>
  )
}

function HeaderBar() {


  return (
    <div className="gray_new">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="font-bold text-xl">My Awesome App</h1>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-4 text-white text-sm">
              <li><a href="#" className="hover:text-gray-300">Home</a></li>
              <li><a href="#" className="hover:text-gray-300">About</a></li>
              
            </ul>
          </nav>
        </div>
      </div>
</div>)
}






const ListItem = (props) => {
  const { link, icon, text, hideText, onClick } = props;
  return (
    <li
      className="flex items-center h-10 rounded-md group hover:shadow-md hover:rounded-md hover:bg-gray-600 p-2"
      onClick={onClick}
    >
      <a href={link}>
        <i className={`mr-2 ${icon}`}></i>
        <span
          className={`opacity-0 transition-opacity duration-200 ease-in-out delay-200 ${
            hideText ? "visible opacity-100" : "invisible"
          } whitespace-nowrap`}
        >
          {text}
        </span>
      </a>
    </li>
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
      className={`w-2/5 h-64 flex flex-col justify-around mt-52 mx-auto transform skew-x-12 bg-gray-400 transition-transform duration-500 ease-out ${translateClass} shadow-xl hover:shadow-2xl hover:scale-105 z-10`}
      style={{ boxShadow: '-40px 40px 0px 0px rgba(0, 0, 0, 0.75)' }}
    >
      <Name />
      <JobTitle />
    </div>
  );
};

const BlogName = () => {
  return (
    <div className='flex justify-center'>
      <a href='https://stefhall2704.pythonanywhere.com' className='text-6xl'>Stefan's Blog</a>
    </div>
  )
}

const BlogDescription = () => {
  return (
    <div className='flex justify-center'>
      <p className='ml-5' >
        This is a multi-user blog site that with a sleek design and with bright colors. I used Django as the backend of this website.
      </p>
    </div>
  )
}


const Blog = () => {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const translateClass = inView
    ? 'translate-x-1/2 -translate-y-1/2 duration-1000'
    : 'translate-x-full -translate-y-full duration-1000';
  const skewClass = inView
    ? 'skew-x-12'
    : '';
  const transitionClass = inView
    ? 'transition-transform ease-out'
    : 'transition-transform ease-in';

  return (
    <div
      ref={ref}
      className={`w-2/5 h-64 flex flex-col justify-around mt-rem-28 bg-slate-200 ${transitionClass} ${translateClass} ${skewClass} shadow-xl`}
      style={{ boxShadow: '-40px 40px 0px 0px rgba(0, 0, 0, 0.75)', }}
    >
      <BlogName />
      <BlogDescription />
    </div>
  );
};

const ExternalSidebarContent = (props) => {
  const { items, collapsed } = props;

  const sidebarWidth = collapsed ? "12rem" : "3.55rem";
  return (
    <div className="gray h-screen" >
    <div
      className={`w-48${
        collapsed ? "transition-width duration-200" : "transition-width duration-200"
      }`}
      style={{ width: sidebarWidth }}
      onMouseEnter={props.toggleCollapsed}
      onMouseLeave={props.toggleCollapsed}
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
        <ul className={`flex-col ${collapsed ? "w-full" : ""}`}>
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
    </div>
  );
};

const TransitionedContent = (props) => {
  return (
    <div
      id="transitioned"
      className={`transition-all duration-2000 ease-in-out ${
        props.collapsed ? "ml-0" : "ml-48"
      }`}
    >
      <p className="text-xl underline font-bold">Stefan</p><p className="text-xl underline font-bold"> Hall</p>
    </div>
  );
};


const Main = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleCollapsed = () => {
  setCollapsed(!collapsed);
  };
  

  return (
  <div id="main">
    <HeaderBar />
    <Sidebar className='bg-gray-400'
    sidebar={<ExternalSidebarContent items={props.items} collapsed={collapsed} toggleCollapsed={toggleCollapsed} />}
    docked={!collapsed}
    open={collapsed}
    onSetOpen={toggleCollapsed}
    >
      <div className="content">
      <Modal />
        <Info />
        <Blog />
      </div>
    </Sidebar>
  </div>
  );
  };



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      collapsed: true,
    };
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  toggleCollapsed() {
    this.setState((prevState) => ({ collapsed: !prevState.collapsed }));
  }
  render() {
    // const sidebarWidth = this.state.collapsed ? "ml-20" : "ml-54";
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
      <body>
        <div className="">
          <Main items={items} collapsed={this.state.collapsed} toggleCollapsed={this.toggleCollapsed} setCollapsed={(value) => this.setState({ collapsed: value })} />
        </div>
      </body>
        
      
    );
  }
}

export default App;