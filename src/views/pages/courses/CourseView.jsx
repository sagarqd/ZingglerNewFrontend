import React, { useState } from 'react';
import InteractiveQuestions from './InteractiveQuestions';
import CourseDetails from './CourseDetails';

const ParentComponent = () => {
    const [questions, setQuestions] = useState([]);

    const handleQuestionsFetch = (fetchedQuestions) => {
        setQuestions(fetchedQuestions);
    };

    return (
        <div>
            <InteractiveQuestions onQuestionsFetch={handleQuestionsFetch} />
            <CourseDetails questions={questions} />
        </div>
    );
};

export default ParentComponent;
