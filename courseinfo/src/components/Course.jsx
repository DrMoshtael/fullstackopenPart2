const Header = ({ courseName }) => <h2>{courseName}</h2>

const Content = ({ parts }) => {
    const sum = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
    return (
      <>
        {parts.map(part =>
          <Part key={part.id} partName={part.name} partExercises={part.exercises} />)}
  
        <Total sum={sum} />
      </>
    )
  }

const Total = ({ sum }) => <strong>Total of {sum} exercises</strong>

const Part = ({ partName, partExercises }) =>
    <p>
      {partName} {partExercises}
    </p>

const Course = ({ course }) => {

    return (
      <>
        <Header courseName={course.name} />
        <Content parts={course.parts} />
      </>
    )
  }

export default Course