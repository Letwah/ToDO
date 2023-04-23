const fakeDataURL = "https://jsonplaceholder.typicode.com/todos";

//state

let todos = [];
let filter = "";
let newItem = "";

//gets data and stores in upper scope

const getFakeData = async () => {
  const { data } = await axios.get(fakeDataURL);
  todos = data;
  //   console.log(data);
  updateInterface();
};

//update the HTML in the interface
const updateInterface = () => {
  //run the filter

  const filteredVersion = todos.filter((todo) => {
    return todo.title === filter;
  });

  filteredVersion.reverse();

  const html = todos.map((item) => {
    return `<div id = "${item.title}" class = "item ${
      item.completed === true ? "Complete" : "Incomplete"
    }">
        <p id = "${item.title}"> "${item.title}"</p>
        </div>`;
  });

  document.getElementById("root").innerHTML = html.join("");
  //   console.log(html.join(""));

  document.getElementById("root").addEventListener("click", (event) => {
    console.log(event.target.id);

    const indexOf = todos.findIndex((todo) => {
      return todo.title === event.target.id;
    });

    console.log(indexOf);
    const copy = [...todos];
    copy.splice(indexOf, 1);
    todos = copy;

    updateInterface();
  });
};

//find the inout box and listen for changes
document.getElementById("filter").addEventListener("input", (event) => {
  //   console.log(event.target.value);
  filter = event.target.value;

  updateInterface(); //calls this so the code is rerun when someone enters a new filter term
});

document.getElementById("newItem").addEventListener("input", (event) => {
  newItem = event.target.value;
});

document.getElementById("addItem").addEventListener("click", () => {
  //make copy of todos

  const copy = [
    ...todos,
    {
      userId: 1000,
      id: Math.round(Math.random() * 1000),
      title: newItem,
      completed: false,
    },
  ];

  todos = copy;

  updateInterface();
});

getFakeData();
