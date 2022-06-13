const Header = props => <h1>{props.course}</h1>

const Part = props => {
  return <p>{props.part} {props.exericses}</p>
}

const Content = props => {
  console.log(props.parts)
  return <>
    <Part part={props.parts[0].name} exericses={props.parts[0].exercises} />
    <Part part={props.parts[1].name} exericses={props.parts[1].exericses} />
    <Part part={props.parts[2].name} exericses={props.parts[2].exericses} />

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
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
  }

  return <Course course={course} />
}

export default App;
