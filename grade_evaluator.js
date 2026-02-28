// 🧑‍💻 Problem: Grade Evaluator
// 📌 Instructions for Students:
// Create a program that:
// Uses a for loop from 50 to 100 (increase by 10).
// Uses a switch statement to determine the grade category.
// Prints the score and its grade equivalent.
// Score Range	Grade
// 90–100	A
// 80–89	B
// 70–79	C
// 60–69	D
// Below 60	F

const students = [{
    name: "Marcus",
    grade: 85
}, {
    name: "Liam",
    grade: 80
}, {
    name: "Ayan",
    grade: 90
}, {
    name: "Abdul",
    grade: 75
}];


function evaulateGrade() {
    console.log(students);
    for (let i = 0; i < students.length; i++) {
    let letter;
        switch(students[i].grade) {
            case 90: {
                letter = "A"
                break;
            }
            case 80: {
                letter = "B"
                break;
            }
            case 70: {
                letter = "C"
                break;
            }
            default: letter = "F"
        }

    // if (students[i].grade >= 90) {
    //   letter = "A";
    // } else if (students[i].grade >= 80) {
    //   letter = "B";
    // } else if (students[i].grade >= 70) {
    //   letter = "C";
    // } else {
    //   letter = "F";
    // }

    console.log(students[i].name + " got a " + letter);
  }

}

evaulateGrade();