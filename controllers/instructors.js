const fs = require('fs')
const data = require("../data.json")
const {age, date} = require('../utils')
//show 
exports.index = (req,res)=>{
    return res.render('instructors/index', {instructors: data.instructors})
}
// Achar o id
exports.show = (req,res) => {
    const {id} = req.params

    const foundInstructor = data.instructors.find((instructors)=> {
      return id == instructors.id
    })

     if(!foundInstructor) return res.send("Instructor not found")

   

     const instructor = {
         ...foundInstructor,
         age: age(foundInstructor.birth),
         services: foundInstructor.services.split(","),
         created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at), // formatar 
     }

     return res.render("instructors/show", {instructor})

}
//Salvar os dados no JSON
exports.post = (req,res) => {
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send("Please, fill all fields")
        }
        
    }
    let {avatar_url, birth, name, services, gender} = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)


    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at,       
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
         if(err) return res.send("Write files error")

         return res.redirect("/instructors")
    })
    //return res.send(req.body)
}

exports.edit = (req,res) => {
    const {id} = req.params

    const foundInstructor = data.instructors.find((instructors)=> {
      return id == instructors.id
    })

     if(!foundInstructor) return res.send("Instructor not found")

     const instructor = {
         ...foundInstructor,
         birth: date(foundInstructor.birth)
     }

    return res.render('instructors/edit', {instructor})
}

exports.put = (req,res)=> {
    const {id} = req.body
    let index = 0
    const foundInstructor = data.instructors.find((instructors, foundIndex)=> {
      if( id == instructors.id){
          index = foundIndex
          return true
      }
    })

     if(!foundInstructor) return res.send("Instructor not found")

     const instructor = {
         ...foundInstructor,
         ...req.body,
         birth: Date.parse(req.body.birth),
         id: Number(req.body.id)
     }

     data.instructors[index] = instructor

     fs.writeFile("data.json", JSON.stringify(data, null, 2), (err)=>{
         if(err) return res.send("Write error!")

         return res.redirect(`/instructors/${id}`)
     })
}

exports.delete = (req,res)=>{
   const {id} = req.body

   const filteredInstructors = data.instructors.filter((instructor)=>{
       return instructor.id != id
   })

   data.instructors = filteredInstructors

   fs.writeFile('data.json', JSON.stringify(data, null, 2), (err)=>{
       if(err) return res.send("Write file error")

       return res.redirect('/instructors')
   })
}