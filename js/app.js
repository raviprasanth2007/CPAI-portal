document.addEventListener("DOMContentLoaded", () => {

    const courses = {

        ports: {
            title: "Ports Design",
            desc: "Embedded Systems",
            levels: 3,
            skill: "Embedded",
            image: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
            data: [
                {
                    name: "Level 1",
                    attempts: 1,
                    status: "Completed",
                    reward: 100,
                    assessment: "MCQ",
                    topics: [
                        "Identify correct assembly constraints for given parts.",
                        "Short MCQ quiz on basic CAD commands"
                    ]
                },
                {
                    name: "Level 2",
                    attempts: 0,
                    status: "OnGoing",
                    reward: 200,
                    assessment: "MCQ",
                    topics: [
                        "Develop clarity on part alignment and fit.",
                        "Learn proper use of dimensions in mechanical design.",
                        "Understand basic part modeling and assembly concepts"
                    ]
                }
            ]
        },

        components: {
            title: "Components Selections",
            desc: "Hardware Fundamentals",
            levels: 4,
            skill: "Hardware",
            image: "https://cdn-icons-png.flaticon.com/512/906/906175.png",
            data: [
                {
                    name: "Level 1",
                    attempts: 1,
                    status: "Completed",
                    reward: 120,
                    assessment: "MCQ",
                    topics: ["Resistors", "Capacitors", "Diodes"]
                },
                {
                    name: "Level 2",
                    attempts: 0,
                    status: "OnGoing",
                    reward: 220,
                    assessment: "Practical",
                    topics: ["Transistors", "ICs", "Power supply"]
                }
            ]
        },

        controller: {
            title: "Controller Pin Mapping",
            desc: "Microcontroller Basics",
            levels: 3,
            skill: "Microcontroller",
            image: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
            data: [
                {
                    name: "Level 1",
                    attempts: 0,
                    status: "OnGoing",
                    reward: 150,
                    assessment: "MCQ",
                    topics: ["Pin diagram", "Input vs Output", "Datasheets"]
                }
            ]
        },

        esp32: {
            title: "ESP32 Overview",
            desc: "IoT & Microcontrollers",
            levels: 4,
            skill: "IoT",
            image: "https://cdn-icons-png.flaticon.com/512/744/744465.png",
            data: [
                {
                    name: "Level 1",
                    attempts: 1,
                    status: "Completed",
                    reward: 150,
                    assessment: "MCQ",
                    topics: ["ESP32 intro", "Pin diagram", "IDE setup"]
                },
                {
                    name: "Level 2",
                    attempts: 0,
                    status: "OnGoing",
                    reward: 250,
                    assessment: "Practical",
                    topics: ["GPIO", "Sensors", "WiFi"]
                }
            ]
        },

        cpp: {
            title: "C++ Basic for Robotics",
            desc: "Programming Fundamentals",
            levels: 3,
            skill: "Programming",
            image: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
            data: [
                {
                    name: "Level 1",
                    attempts: 1,
                    status: "Completed",
                    reward: 100,
                    assessment: "MCQ",
                    topics: ["Syntax", "Variables", "Datatypes"]
                },
                {
                    name: "Level 2",
                    attempts: 0,
                    status: "OnGoing",
                    reward: 200,
                    assessment: "Coding",
                    topics: ["Loops", "Functions", "Arrays"]
                }
            ]
        },

        controlflow: {
            title: "Control Flow for Robotics",
            desc: "Logic Building",
            levels: 3,
            skill: "Logic",
            image: "https://cdn-icons-png.flaticon.com/512/2436/2436874.png",
            data: [
                {
                    name: "Level 1",
                    attempts: 0,
                    status: "OnGoing",
                    reward: 100,
                    assessment: "MCQ",
                    topics: ["If else", "Loops", "Flowcharts"]
                }
            ]
        },

        oops: {
            title: "Introduction to OOPS",
            desc: "Object Oriented Programming",
            levels: 3,
            skill: "Software",
            image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
            data: [
                {
                    name: "Level 1",
                    attempts: 0,
                    status: "OnGoing",
                    reward: 100,
                    assessment: "MCQ",
                    topics: ["Class", "Object", "Encapsulation"]
                }
            ]
        }

    };

    /* ================= COURSE PAGE ENGINE ================= */

    if (document.getElementById("courseTitle")) {

        const params = new URLSearchParams(window.location.search);
        const key = params.get("course");

        if (!courses[key]) {
            document.getElementById("noCourse").style.display = "block";
            document.querySelector(".course-header-card").style.display = "none";
            return;
        }

        const course = courses[key];

        document.getElementById("courseTitle").innerText = course.title;
        document.getElementById("courseDesc").innerText = course.desc;
        document.getElementById("courseImage").src = course.image;

        document.getElementById("courseMeta").innerHTML = `
   <span><i class="fa-solid fa-layer-group"></i> Levels: ${course.levels}</span>
   <span><i class="fa-solid fa-star"></i> ${course.skill} Skill</span>
 `;

        const box = document.getElementById("levelsContainer");
        box.innerHTML = "";

        course.data.forEach((lvl, i) => {

            let topicsHTML = "";
            lvl.topics.forEach((t, n) => {
                topicsHTML += `<div class="topic">${n + 1}. ${t}</div>`;
            });

            box.innerHTML += `
   <div class="level-card">

     <div class="level-header">
       <div class="level-title">
         <span class="level-circle">${i + 1}</span>
         <h3>${course.title} - ${lvl.name}</h3>
       </div>

       <div class="level-status">
         <span class="pill">Attempts: ${lvl.attempts}</span>
         <span class="pill ${lvl.status == "Completed" ? "success" : "warning"}">${lvl.status}</span>
       </div>
     </div>

     <div class="level-body">

       <div class="topics">${topicsHTML}</div>

       <div class="level-info">
         <p><b>With Rewards</b><br>🏆 ${lvl.reward}</p>
         <p><b>Assessment Type</b><br>${lvl.assessment}</p>
          ${lvl.status !== "Completed" ?
                    `<button class="start-btn" onclick="startTest('${course.title}','${lvl.name}')">
 ▶ Start Test
</button>`
                    :
                    `<div class="completed-text">✔ Test Completed</div>`
                }

       </div>

     </div>
   </div>`;
        });

    }

});


function startTest(course, level) {
    alert("Starting test for:\n\n" + course + " - " + level);
    // later: window.location.href = "test.html?course=ports&level=1";
}
