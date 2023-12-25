const gradation = {
  20: "satisfactory",
  55: "good",
  85: "very-good",
  100: "excellent",
};
const users = [
  {
    name: "Jack Smith",
    age: 23,
    img: "JackSmith",
    role: "student",
    courses: [
      {
        title: "Front-end Pro",
        mark: 20,
      },
      {
        title: "Java Enterprise",
        mark: 100,
      },
    ],
  },
  {
    name: "Amal Smith",
    age: 20,
    img: "AmalSmith",
    role: "student",
  },
  {
    name: "Noah Smith",
    age: 43,
    img: "NoahSmith",
    role: "student",
    courses: [
      {
        title: "Front-end Pro",
        mark: 50,
      },
    ],
  },
  {
    name: "Charlie Smith",
    age: 18,
    img: "CharlieSmith",
    role: "student",
    courses: [
      {
        title: "Front-end Pro",
        mark: 75,
      },
      {
        title: "Java Enterprise",
        mark: 23,
      },
    ],
  },
  {
    name: "Emily Smith",
    age: 30,
    img: "EmilySmith",
    role: "admin",
    courses: [
      {
        title: "Front-end Pro",
        score: 10,
        lector: "Leo Smith",
      },
      {
        title: "Java Enterprise",
        score: 50,
        lector: "David Smith",
      },
      {
        title: "QA",
        score: 75,
        lector: "Emilie Smith",
      },
    ],
  },
  {
    name: "Leo Smith",
    age: 253,
    img: "LeoSmith",
    role: "lector",
    courses: [
      {
        title: "Front-end Pro",
        score: 78,
        studentsScore: 79,
      },
      {
        title: "Java Enterprise",
        score: 85,
        studentsScore: 85,
      },
    ],
  },
];

class User {
  constructor(props) {
    this.name = props?.name || "";
    this.age = props?.age || "";
    this.img = props?.img || "";
    this.role = props?.role || "";
    this.courses = props?.courses || [];
  }

  render() {
    return `
    <div class="user__info">
    <div class="user__info--data">
      <img
      src="images/users/${this.img}.png"
      alt="${this.name}"
      height="50"
      />
      <div class="user__naming">
      <p>Name: <b>${this.name}</b></p>
      <p>Age: <b>${this.age}</b></p>
      </div>
    </div>
    <div class="user__info--role student">
      <img src="images/roles/${this.role}.png" alt="${this.role}" height="25" />
      <p>${this.role}</p>
    </div>
    </div>
  `;
  }
  renderCourse() {
    return this.courses.length > 0
      ? this.courses
          .map(
            (course) =>
              `<div class="user__courses" id="user__courses">
    <p class="user__courses--course ${this.role}">
      ${course.title}<span class="${this.getLevelClass(
                course.mark
              )}">${this.getLevelClass(course.mark)}</span>
    </p>
  </div>`
          )
          .join("")
      : "";
  }
  getLevelClass(mark) {
    return Object.entries(gradation).reduce((acc, [key, value]) => {
      if (mark <= parseInt(key) && !acc) {
        acc += value;
      }
      return acc;
    }, "");
  }
}

class Student extends User {
  constructor(props) {
    super(props);
  }
}
class Admin extends User {
  constructor(props) {
    super(props);
  }
  renderCourse() {
    return this.courses.length > 0
      ? this.courses
          .map(
            (course) => `
    <div class="user__courses admin--info">
    <div class="user__courses--course admin">
    <p>Title: <b>${course.title}</b></p>
    <p>Admin's score: <span class="${this.getLevelClass(
      course.score
    )}">${this.getLevelClass(course.score)}</span></p>
    <p>Lector: <b>${course.lector}</b></p>
    </div>
  </div>`
          )
          .join("")
      : "";
  }
}
class Lector extends User {
  constructor(props) {
    super(props);
  }
  renderCourse() {
    return this.courses.length > 0
      ? this.courses
          .map(
            (course) => `
    <div class="user__courses admin--info">
    <div class="user__courses--course lector">
      <p>Title: <b>${course.title}</b></p>
      <p>Lector's score: <span class="${this.getLevelClass(
        course.studentsScore
      )}">${this.getLevelClass(course.studentsScore)}</span></p>
      <p>
        Average student's score: <span class="${this.getLevelClass(
          course.studentsScore
        )}">${this.getLevelClass(course.studentsScore)}</span>
      </p>
    </div>
  </div>`
          )
          .join("")
      : "";
  }
}
class cardUser {
  constructor(user) {
    this.user = user;
  }
  userExist() {
    switch (this.user?.role) {
      case "admin":
        return new Admin(this.user);
      case "lector":
        return new Lector(this.user);
      default:
        return new Student(this.user);
    }
  }
}

const render = users
  .map((user) => {
    const upUser = new cardUser(user).userExist();
    return `<div class="user">${upUser.render()}<div class="user__courses">
  ${upUser.renderCourse()}</div></div>`;
  })
  .join("");

document.write(`
  <div class="users">
${render}
  </div>`);
