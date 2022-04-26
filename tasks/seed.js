const user = require('../data/user');
const course = require('../data/course');
const professor = require('../data/professor');
const connection = require('../config/mongoConnection');
const { ObjectId } = require('mongodb');

const main = async () => {
    const db = await connection.connectToDb();
    await db.dropDatabase();
    let courseToDelete = undefined
    console.log("1. Create a course"); 
    try {
        let user1 = await user.createUser('jguo32', '123456');
        console.log(user1);

        // let course1 = await course.createCourse(
        //     'CS 546 Web Programming', // courseName
        //     'Graduate', // academicLevel
        //     'Computer Science Program', // courseOwner
        //     'Core', // type
        //     ['Audit', 'Graded', 'Pass/Fail'], // gradingBasis
        //     3, // units
        //     'This course will provide students with a first strong approach of internet programming', // description
        //     ['Fall Semester', 'Spring Semester', 'Summer Session'], // typicalPeriodsOffered
        //     'Lecture', // instructionalFormats
        //     'https://web.stevens.edu/academic_files/courses/syllabus/CS546syl.pdf', // syllabus
        //     'https://github.com/graffixnyc/CS-546', // courseware
            
        // ); // courseReview

        // add a professor
        let name = 'Eric Koskinen';
        let department = "Computer Science";
        let intro =
            'My research yields techniques that improve the way programmers develop reliable and efficient concurrent software for multi-core and distributed systems.';
        let pic = "url to picture"
        let professor1 = await professor.createProfessor(name, department, intro, pic);
        console.log(professor1);

        // add a professor review
        let uid = user1.insertedId.toString();
        let pid = professor1._id.toString();
        let review = 'nice!';

        let review1 = await professor.addProfReview(uid, pid, review, 5);
        let prof1 = await professor.getProfById(pid);
        console.log(review1);
        console.log(prof1);
        
    } catch (e) {
        console.log(e);
    }

    await connection.closeConnection();
    console.log('Done!');
};
main();
