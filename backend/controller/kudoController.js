//use npm package 'asyncHandler' replace try(..)catch(..) block 
const asyncHandler = require('express-async-handler')

const Kudo = require('../models/kudoModel')

//@controller: get all kudos
//@route GET /api/kudos
//@access private
const getKudos = asyncHandler(async (req, res) => {
    //getting all kudos
    console.log(`getting all kudos`);
    const kudos = await Kudo.find()

    res.status(200).json({
        message: `Get all Kudos`,
        data: kudos
    })
})


//@controller: create a kudo
//@route POST /api/kudos
//@access private
const setKudo = asyncHandler(async (req, res) => {
    if (!req.body.message) {
        res.status(400)
        throw new Error('Please add text field')
    }

    console.log(`Create kudo`);
    const kudo = await Kudo.create({
        sender: req.body.sender,
        receiver: req.body.receiver,
        kudoGif: req.body.kudoGif,
        message: req.body.message
    })

    res.status(200).json({
        message: `Kudo Created`,
        data: kudo
    })
})


//@controller: update a kudo - add collection
//@route PATCH /api/kudos/like/:id
//@access private
const likeKudo = asyncHandler(async (req, res) => {
    const kudo = await Kudo.findById(req.params.id)
    if (!kudo) {
        res.status(400)
        throw new Error('Kudo not found')
    }
    console.log(`calling from ${req.body.name} type: ${req.body.type}`);

    if (req.body.name) {
        if (req.body.type === 'like' && kudo.people.includes(req.body.name) === false) {
            const peopleList = kudo.people
            peopleList.push(req.body.name)
            await Kudo.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    $inc: { likes: 1 },
                    $set: { people: peopleList }
                }
            )
        }

        if (req.body.type === 'dislike' && kudo.people.includes(req.body.name) === true) {
            const peopleList = kudo.people.filter(ele => ele !== req.body.name)
            await Kudo.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    $inc: { likes: -1 },
                    $set: { people: peopleList }
                }
            )
        }

        res.status(200).json({
            message: `Update a Kudo - action: ${req.body.type}`
        })
    }
})

//@controller: update a kudo - thumbUp
//@route PATCH /api/kudos/thumbUpKudo/:id
//@access private
const thumbUpKudo = asyncHandler(async (req, res) => {
    const kudo = await Kudo.findById(req.params.id)
    if (!kudo) {
        res.status(400)
        throw new Error('Kudo not found')
    }

    await Kudo.findByIdAndUpdate(
        { _id: req.params.id },
        {
            $set: { likes: req.body.number }
        }
    )

    res.status(200).json({
        message: `Update a Kudo - action: thumb Up`
    })
})


//@controller: delete a kudo
//@route DELETE /api/kudos/:id
//@access private
const deleteKudo = asyncHandler(async (req, res) => {
    const kudo = await Kudo.findById(req.params.id)

    if (!kudo) {
        res.status(400)
        throw new Error('Kudo not found')
    }

    await kudo.remove()

    res.status(200).json({
        message: `Kudo is Deleted: ${req.params.id}`
    })
})


//@controller: get kpi data
//@route GET /api/kudos/kpi
//@access private
const getKpi = asyncHandler(async (req, res) => {
    const checkDate = new Date()
    checkDate.setDate(checkDate.getDate() - 30)

    const totalKudos = await Kudo.countDocuments()
    const recentKudos = await Kudo.countDocuments({
        createdAt: {
            $gte: checkDate
        }
    })

    res.status(200).json({
        total: totalKudos,
        recent: recentKudos
    })
})




module.exports = {
    getKudos, setKudo, likeKudo, deleteKudo, getKpi, thumbUpKudo
}