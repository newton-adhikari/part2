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

export default Course;