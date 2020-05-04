'use strict'



/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Student = use('App/Models/Student')

Route.get('/', () => {
  return {
    greeting: 'Hello world in JSON'
  }
})


Route.group(() => {
  Route.get('students', async ({
    response
  }) => {
    let students = await Student.all()
    return response.json(students)
  })

  Route.post('students', async ({
    request,
    response
  }) => {
    const studentInfo = request.only(['nisn', 'name', 'study']);
    const student = new Student()
    student.nisn = studentInfo.nisn
    student.name = studentInfo.name
    student.study = studentInfo.study

    await student.save()
    return response.json(student)
  });

  Route.get('students/:id', async ({
    params,
    response
  }) => {
    let students = await Student.find(params.id)
    return response.json(students)
  })

  Route.put('students/:id', async ({
    params,
    request,
    response
  }) => {
    const studentInfo = request.only(['nisn', 'name', 'study'])
    const student = await Student.find(params.id)
    student.nisn = studentInfo.nisn
    student.name = studentInfo.name
    student.study = studentInfo.study

    await student.save()

    return response.status(200).json(student)


  })

  Route.delete('students/:id', async ({
    params,
    response
  }) => {
    const student = await Student.find(params.id)
    if (!student) {
      return response.status(404).json(null)
    }

    await student.delete()
    return response.status(204).json(null)
  })
});
