const fs = require('fs')
const data = require("../data.json")
const {age, date} = require('../utils')
//show 
exports.index = (req,res)=>{
    return res.render('members/index', {members: data.members})
}
// Achar o id
exports.show = (req,res) => {
    const {id} = req.params

    const foundMember = data.members.find((members)=> {
      return id == members.id
    })

     if(!foundMember) return res.send("Member not found")

   

     const member = {
         ...foundMember,
         age: age(foundMember.birth),
     }

     return res.render("members/show", {member})

}

exports.create = (req,res)=>{
    return res.render('members/create')
}
//Salvar os dados no JSON
exports.post = (req,res) => {
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send("Please, fill all fields")
        }
        
    }

    birth = Date.parse(req.body.birth)
    let id = 1
    const lastMember =  data.members[data.members.length - 1]
    if(lastMember){
        id = lastMember.id + 1
    }


    data.members.push({
        ...req.body,
        id,
        birth,    
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
         if(err) return res.send("Write files error")

         return res.redirect(`/members/${id}`)
    })
    //return res.send(req.body)
}

exports.edit = (req,res) => {
    const {id} = req.params

    const foundMember = data.members.find((members)=> {
      return id == members.id
    })

     if(!foundMember) return res.send("Member not found")

     const member = {
         ...foundMember,
         birth: date(foundMember.birth)
     }

    return res.render('members/edit', {member})
}

exports.put = (req,res)=> {
    const {id} = req.body
    let index = 0
    const foundMember = data.members.find((members, foundIndex)=> {
      if( id == members.id){
          index = foundIndex
          return true
      }
    })

     if(!foundMember) return res.send("Member not found")

     const member = {
         ...foundMember,
         ...req.body,
         birth: Date.parse(req.body.birth),
         id: Number(req.body.id)
     }

     data.members[index] = member

     fs.writeFile("data.json", JSON.stringify(data, null, 2), (err)=>{
         if(err) return res.send("Write error!")

         return res.redirect(`/members/${id}`)
     })
}

exports.delete = (req,res)=>{
   const {id} = req.body

   const filteredMembers = data.members.filter((member)=>{
       return member.id != id
   })

   data.members = filteredMembers

   fs.writeFile('data.json', JSON.stringify(data, null, 2), (err)=>{
       if(err) return res.send("Write file error")

       return res.redirect('/members')
   })
}