const Header = ({ courseName }) => <h2>{courseName}</h2>

const Total = ({ sum }) => <strong>Total of {sum} exercises</strong>

const Part = ({ partName, partExercises }) =>
  <p>
    {partName} {partExercises}
  </p>

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

const Course = ({ course }) => {

  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
    <h1>Web development curriculum</h1>
    <>{courses.map(course =>

      <Course key={course.id} course={course} />)}</>
      </>
  )
}


export default App