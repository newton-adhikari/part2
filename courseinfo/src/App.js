const Header = props => <h1>{props.course}</h1>

const Part = props => {
  return <p>{props.part} {props.exericses}</p>
}

const Content = ({parts}) => {
  return <>
    {parts.map(p => <Part key={p.id} part={p.name} exericses={p.exercises} />)}
  </>
}

const Total = ({total}) => <strong>total of {total} exercises</strong>

const Course = ({course}) => {
  let totalExe = course.parts.reduce((n, c) => n+=c.exercises, 0);

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={totalExe} />
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
    <div>
      {courses.map(c => <Course key={c.id} course={c} />)}
    </div>
  )
}

export default App;
