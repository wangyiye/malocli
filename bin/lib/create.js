const fs = require('fs-extra')
const path = require('path')
const Creator = require('./Creator')


module.exports = async function (name, opt) {
    const cwd = process.cwd();
    const dir = path.join(cwd, name)
    if (fs.existsSync(dir)) {
        if (opt.force) {
            await fs.remove(dir)
        } else {
            import('inquirer').then(res => {
                res.default.prompt([
                    {
                        name: 'action',
                        type: 'list',
                        message: '目录存在继续还是取消',
                        choices: [
                            { name: 'Overwrite', value: 'overwrite' },
                            { cancel: 'Cancel', value: false }
                        ]
                    }
                ]).then(res=>{
                    const { action} = res
                    if (!action) {
                        return
                    } else if (action === 'overwrite') {
                        console.log('removing................')
                        fs.remove(dir)
                    }
                })
            })

        }
    }
    const creator = new Creator(name,dir)
    creator.create()
}