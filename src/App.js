import React, { useState } from "react";
import Sidebar from "react-sidebar";
import { useInView } from "react-intersection-observer";

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="flex justify-end">
      <button onClick={openModal} className="focus:outline-none z-10">
        Contact
      </button>
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full  sm:mx-0 sm:h-10 sm:w-10">
                    <i className="fa-sharp fa-regular fa-address-card text-4xl"></i>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Contact Information
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Name: Stefan Hall
                        <br />
                        Email: stefhall.2704@gmail.com
                        <br />
                        Number: (434)962-5099
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeModal}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-400 text-base font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function HeaderBar() {
  return (
    <div className="yellow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-4xl">Stefan's Portfolio</h1>
          </div>
          <nav className="md:block">
            <ul className="flex space-x-4 text-sm">
              <li>
                <Modal />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

const ListItem = (props) => {
  const { link, icon, text, hideText, onClick } = props;
  return (
    <li
      className="flex items-center h-10 rounded-md group hover:shadow-md hover:rounded-md sidebar-yellow p-2"
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
    <div className="flex justify-center">
      <h1 className="text-4xl">Stefan Hall</h1>
    </div>
  );
};

const JobTitle = () => {
  return (
    <div className="flex justify-center">
      <h1 className="text-xl">
        Site Reliability Engineer
      </h1>
    </div>
  );
};

const Info = () => {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const skewClass = inView ? "skew-x-12" : "";
  const transitionClass = inView
    ? "transition-transform ease-out"
    : "transition-transform ease-in";
  const translateClass = inView
    ? "translate-x-0 duration-1000"
    : "translate-x-full duration-1000";
  return (
    <div
      ref={ref}
      className={`w-2/5 h-64 flex flex-col skew justify-around mt-52 mx-auto transform red transition-transform duration-500 ease-out ${translateClass} ${transitionClass} ${skewClass} shadow-xl hover:shadow-2xl hover:scale-105 z-10`}
      style={{ boxShadow: "-40px 40px 0px 0px rgba(0, 0, 0, 0.5)" }}
    >
      <Name />
      <JobTitle />
    </div>
  );
};

const Story = () => {

  return (
    <div
      className={` w-10/12 h-auto flex flex-col justify-center ml-auto mr-auto mt-56 yellow shadow-xl`}
      style={{ boxShadow: "-40px 40px 0px 0px rgba(0, 0, 0, 0.5)" }}
    >
      <div className="ml-5 mb-5 mr-5" >
        <h1 className="text-4xl flex justify-center mt-5">Self-Taught Developer Story</h1>
        <p className='mt-10'>
          In 2019, I was a Supervisor at a Insulated Metal Panel (IMP) plant.
          And along with the daily tasks I had, along the way, I found different
          tasks that should absolutely be automated. So with not knowing
          anything other than basics in Microsoft Excel. I went to learn about
          simple cell formulas in excel. Once gaining a good amount of knowledge
          on that, I realized it was powerful, but only so powerful. I wound up
          learning VBA, which is a language that is able to be used in excel to
          write scripts that have more power to them. This is what really
          sparked my curiosity of how technology works. <br /> <br />About a year
          later, I found a lot of employees having to manually look for
          supplies, going up and down hallways of shelves. When I thought of a
          way that could fix this issue. Using Microsoft Access's Database. So I
          learned from youtube and documentation of how to use Microsoft Access.
          I created a multi-table database, where users throughout the plant can
          have a user interface within Access, to insert data, change data, and
          relocate the data for where they move supplies. This also ended up
          helping with inventory. <br /><br /> After this I was absolutely hooked into
          tech! I went on to take an attempt on a Coursera course,{" "}
          <a href="https://www.coursera.org/account/accomplishments/verify/2FN2YFQEH3BM">
            <strong><em className='hover:underline'>Programming Foundations with JavaScript, HTML and CSS</em></strong>
          </a>
          . I completed this course with honors. And after this. I took a little
          bit of a break from tech. Than about 8 months later, I found an old
          friend that was recently a Site Reliability Engineer at Microsoft and
          was currently an Automation Integration Engineer at CFA Institute. So
          I reached out to him about my interest in tech. And he really helped
          me with his mentorship along the way. <br /><br />
          <h1 className='text-xl' >Mentorship:</h1>
          <br />
          As being a mentee, I went along with numerous suggested tasks provided
          by my mentor. This started out with earning a certificate in{" "}
          <a href="https://www.codecademy.com/profiles/stefhall2704/certificates/6c152bd262967f8c941c9707ed636bda">
          <strong><em className='hover:underline'>Python with codecademy</em></strong>
          </a>
          . This really helped me learn more of the basics in programming. For
          loops, if statements, while loops, OOP, etc. On completion of this
          course. I went for a simple challenge, fizzbuzz. Seemed to be fairly
          simple. But as I quickly discovered, is that was going to be the last
          simple challenge I would have in a long time. My next task, was to use
          free code camp to earn a certificate in{" "}
          <a href="https://www.freecodecamp.org/certification/stefan_hall/responsive-web-design">
          <strong><em className='hover:underline'>Responsive Web Design</em></strong>
          </a>
          . This really helped me dig more into web design, which is very
          important in full stack development. With my previous knowledge of
          Python, I went down the route of learning{" "}
          <a href="https://www.freecodecamp.org/certification/stefan_hall/data-analysis-with-python-v7">
          <strong><em className='hover:underline'>Data Analysis with Python</em></strong>
          </a>
          . This really showed me a lot of new challenges, using numpy, pandas,
          with Jupyter Notebooks. But really helped me learn that a programming
          language is meant to be a tool. And certain tools work for certain
          tasks. For myself, whenever I need to crunch data, I will definitely
          use python with numpy and pandas. Seems to be very simple to use with
          parsing csv's with dataframes, and even putting the data in graphs.
          Organizing the data in such a way that would make sense for the task,
          etc. <br /> <br /> Following the Data Analysis with Python course, is when I
          was able to land a my first tech job as a Jr. Automation Integration
          Engineer. With all the excitement  in the world, this really showed me
          how humbling being in the tech industry is. At the time, each task
          seemed impossible. So it was a lot of mentoring from my team along the
          way. Really helped me get to the next level. During the first 4
          months, I had a task of going through legacy code, in order to learn
          what the tool was doing. But, unfortunately, this was written in C#.
          Which really wound up being a very difficult problem with me. I have
          had experience in Python, and a bit in JavaScript at this point. So
          learning a new language, still within the first year of hard grinding
          in tech, seemed to pose a huge set of challenges for me. But, with all
          the odds stacked against me, I was able to overcome all the challenges
          it gave me. It took a few months, but was well worth the time. <br /> <br />
          After learning this tools codebase, I had a new challenge, to pair up
          with my teammate, to rewrite the tool using a more modern framework.
          Which obviously at this time, my main experience was with python. We
          ended up using FastAPI as a framework, which has an out of the box
          swagger docs. So this obviously posed its own challenges along the
          way, digging back into the old code base, than back to new codebase,
          to rewrite the functionality in a speedy, but secure way. After taking
          up 10 months of time from our 2 people team on this project, this was
          finally complete. I am recognized as the lead developer of this
          project, where I also used pytest to test our api's, which gives us a
          93% code coverage. <br /> <br /> By the time this was complete, I was
          promoted to a Site Reliability Engineer. This obviously brought a huge
          set of challenges. Learning about SLO's, SLI's, SLA's, helping
          implement opentelemetry in each service for tracing, being able to
          setup grafana with new data sources in order to monitor newly added
          services, tracking upstream and downstream dependencies, etc. A big
          part of what I have learned in this was the grafanalib library. This
          library helped backup all of our dashboards throughout grafana. Even
          using a specific data-source to use with grafanalib to recreate all
          monitoring for our 4 golden signals that we can use to map all of our
          services with there repositories, Azure Monitors App servives,
          corresponding databases for those services, etc.
        </p>
      </div>
    </div>
  );
};

const BlogName = () => {
  return (
    <div className="flex justify-center mt-5">
      <h1>
      <a
        href="https://stefhall2704.pythonanywhere.com"
        className="text-4xl hover:underline"
      >
        Stefan's Blog
      </a></h1>
    </div>
  );
};

const BlogDescription = () => {
  return (
    <div className="flex justify-center ml-5 mb-5 mr-5">
      <ul>
        <li>
          
            <h1 className='text-xl' >
            Introduction:
            </h1>
            <br />
            <p>
            As a beginner in software development, I went through various
            courses and gained certificates in Codecademy, Free Code Camp, and
            Coursera. However, I found that these courses did not teach me about
            frameworks. To overcome this, I decided to undertake the Django
            Girls Tutorial.
          </p>
        </li>
        <br />
        <li>
            <h1 className='text-xl' > 
            Skills and Knowledge:
            </h1>
            <br />
            <p>
            During the tutorial, I gained a solid understanding of the basics of
            how templating languages work and how to create a multipage web
            application using Django. I also learned the basics of context
            variables. Through the tutorial, I was able to apply my newfound
            knowledge in both front-end and back-end development, allowing me to
            become a more versatile developer.
          </p>
        </li>
        <br />
        <li>
          <h1 className='text-xl' > 
            Specifics:
            </h1>
            <br />
            <p>
            I used the skills and knowledge I gained to create a personal
            project that is now part of my portfolio. The project is a blog
            application where users can view individual blog posts and post
            comments. I also made sure to add a responsive design to make the
            application user-friendly.
          </p>
        </li>
        <br />
        <li>
            <h1 className='text-xl' > 
            Conclusion:
            </h1>
            <br />
            <p>
            Overall, the Django Girls Tutorial was a great learning experience
            that allowed me to improve my skills in software development.
            Through the tutorial, I was able to create a personal project that
            showcased my understanding of Django and front-end development. I am
            proud to have this project as part of my portfolio, and I look
            forward to applying the skills and knowledge I gained in future
            projects.
          </p>
        </li>
      </ul>
    </div>
  );
};

const Blog = () => {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const translateClass = inView
    ? "translate-x-1/2 -translate-y-1/2 duration-1000"
    : "translate-x-full -translate-y-full duration-1000";
  const skewClass = inView ? "-skew-x-3" : "";
  const transitionClass = inView
    ? "transition-transform ease-out"
    : "transition-transform ease-in";

  return (
    <div
      ref={ref}
      className={` w-6/12 h-auto flex flex-col justify-around mt-rem-38 red ${transitionClass} ${translateClass} ${skewClass} shadow-xl`}
      style={{ boxShadow: "-40px 40px 0px 0px rgba(0, 0, 0, 0.5)" }}
    >
      <BlogName />
      <BlogDescription />
    </div>
  );
};

const DijkstrasDescription = () => {
  return (
    <div className="flex justify-center ml-5 mb-5 mr-5">
      <ul>
        <li>
          <h1 className='text-xl' >
            Introduction:
            </h1>
            <br />
            <p>
            As I delved into algorithmic learning, I sought out challenges to
            build my skills, starting with small problems like 2 sum and
            Palindrome on Code Wars. This led me to explore more advanced
            algorithms like binary search, Branch Sums, and Depth First Search,
            which provided a foundation for understanding pathfinding
            algorithms. With so many options to choose from, including DFS, BFS,
            A* Search, Greedy Best-first Search, and Dijkstra's, I decided to
            focus on mastering Dijkstra's algorithm in-depth.
          </p>
        </li>
        <br />
        <li>
          
          <h1 className='text-xl' >
            Skils and Knowledge:
            </h1>
            <br />
            <p>
            To put my knowledge into practice, I challenged myself to build a
            pathfinding algorithm visualizer using JavaScript. The visualizer
            enables users to create a canvas of grids and add starting and
            ending nodes, which then highlights the search in real-time as the
            algorithm progresses through each "cell" of the grid.
          </p>
        </li>
        <br />
        <li>
            <h1 className='text-xl' >
            Challenges:
            </h1>
            <br />
            <p>
            I had to overcome numerous challenges throughout the
            development process, including timing the highlighting of squares to
            ensure it was visible to the human eye, adding a user interface to
            control the sequence of highlighted cells, and creating blocks that
            prevented the algorithm from searching in certain cells. These
            challenges required a significant amount of time and effort, but
            ultimately allowed me to better understand how Dijkstra's algorithm
            could be used in a real-world application.
          </p>
        </li>
        <br />
        <li>
            <h1 className='text-xl' >
            Conclusion:
            </h1>
            <br />
            <p>
            Overall, the project provided me with a deeper understanding of
            Dijkstra's algorithm, allowed me to build my problem-solving
            abilities, and improved my technical skills in JavaScript. I would
            highly recommend this project to any aspiring developer seeking to
            build their skills in algorithmic problem-solving and web
            development.
          </p>
        </li>
      </ul>
    </div>
  );
};

const DijkstrasAlgorithm = () => {
  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);
  const [gradientX, setGradientX] = React.useState(50);
  const [gradientY, setGradientY] = React.useState(50);

  const handleMouseMove = (e) => {
    const div = e.currentTarget;
    const rect = div.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = div.offsetWidth / 2;
    const centerY = div.offsetHeight / 2;
    const deltaX = x - centerX;
    const deltaY = y - centerY;
    const rotateX = -deltaY / 30;
    const rotateY = deltaX / 30;
    setRotateX(rotateX);
    setRotateY(rotateY);
    setGradientX((x / div.offsetWidth) * 100);
    setGradientY((y / div.offsetHeight) * 100);
  
    // Calculate shadow offsets based on rotation angles
    const shadowX = Math.round(-rotateY * 2);
    const shadowY = Math.round(rotateX * 2);
    const shadow = `${shadowX}px ${shadowY}px 0px 0px rgba(0, 0, 0, 0.75)`;
    div.style.boxShadow = shadow;
  };
  

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGradientX(50);
    setGradientY(50);
  };

  return (
    <div
      className={`h-auto w-9/12 flex justify-center m-auto transform bg-gray-500 transition-transform duration-500 ease-out shadow-xl`}
      style={{
        boxShadow: "-40px 40px 0px 0px rgba(0, 0, 0, 0.5)",
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        backgroundImage: `linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), radial-gradient(circle at ${gradientX}% ${gradientY}%, #EA738DFF, #408EC6`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <h1>
        <a
          href="https://codepen.io/stefan_hall/full/JjBKWbL"
          className="text-4xl mt-5 flex justify-center hover:underline"
        >
          Dijkstra's Algorithm Visualized
        </a></h1>
        <DijkstrasDescription />
      </div>
    </div>
  );
};

const ExternalSidebarContent = (props) => {
  const { items, collapsed } = props;

  const sidebarWidth = collapsed ? "12rem" : "3.55rem";
  return (
    <div className="yellow h-screen">
      <div
        className={`w-48${
          collapsed
            ? "transition-width duration-200"
            : "transition-width duration-200"
        }`}
        style={{ width: sidebarWidth }}
        onMouseEnter={props.toggleCollapsed}
        onMouseLeave={props.toggleCollapsed}
      >
        <div className="block text-right py-2 px-3">
          <div className="rounded-md overflow-hidden">
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
      <p className="text-xl underline font-bold">Stefan</p>
      <p className="text-xl underline font-bold"> Hall</p>
    </div>
  );
};

const Main = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div id="main" className="font-serif">
      <HeaderBar />
      <Sidebar
        sidebar={
          <ExternalSidebarContent
            items={props.items}
            collapsed={collapsed}
            toggleCollapsed={toggleCollapsed}
          />
        }
        docked={!collapsed}
        open={collapsed}
        onSetOpen={toggleCollapsed}
      >
        <div className="content">
          <Info />
          <Story />
          <Blog />
          <DijkstrasAlgorithm />
          <div className="h-54"></div>
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
        text: "Codepen",
      },
    ];

    return (
      <body>
        <div className='root-container'>
          <Main
            items={items}
            collapsed={this.state.collapsed}
            toggleCollapsed={this.toggleCollapsed}
            setCollapsed={(value) => this.setState({ collapsed: value })}
          />
        </div>
      </body>
    );
  }
}

export default App;
