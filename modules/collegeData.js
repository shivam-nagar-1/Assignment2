const fs = require('fs');

class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}

let dataCollection = null;

const initialize = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/students.json', 'utf8', (err, studentsData) => {
            if (err) {
                reject("unable to read students.json");
                return;
            }

            const students = JSON.parse(studentsData);

            fs.readFile('./data/courses.json', 'utf8', (err, coursesData) => {
                if (err) {
                    reject("unable to read courses.json");
                    return;
                }

                const courses = JSON.parse(coursesData);
                dataCollection = new Data(students, courses);
                resolve();
            });
        });
    });
};

const getAllStudents = () => {
    return new Promise((resolve, reject) => {
        if (dataCollection.students.length === 0) {
            reject("no results returned");
        } else {
            resolve(dataCollection.students);
        }
    });
};

const getTAs = () => {
    return new Promise((resolve, reject) => {
        const tas = dataCollection.students.filter(student => student.TA);
        if (tas.length === 0) {
            reject("no results returned");
        } else {
            resolve(tas);
        }
    });
};

const getCourses = () => {
    return new Promise((resolve, reject) => {
        if (dataCollection.courses.length === 0) {
            reject("no results returned");
        } else {
            resolve(dataCollection.courses);
        }
    });
};

module.exports = { initialize, getAllStudents, getTAs, getCourses };
