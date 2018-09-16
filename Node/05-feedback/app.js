var http = require('http')
var fs = require('fs')
var template = require('art-template')
var url = require('url')

var comments = [
    {
        name: '张三',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三2',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三3',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三4',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三5',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    }
]

http
    .createServer(function (req, res) {
        var parseObj = url.parse(req.url, true)
        var pathname = parseObj.pathname
        
        if (pathname === '/') {
            fs.readFile('./views/index.html', function (error, data) {
                if (error) {
                    return res.end('404 Not Found')
                }
                // 将模板源代码编译成函数并立刻执行 template.render(source, data, options)
                var htmlStr = template.render(data.toString(), {
                    comments: comments
                })
                res.end(htmlStr)
            })
        } else if (pathname.indexOf('/public') === 0) {
            //如果请求是以/public开头的
            fs.readFile('.' + pathname, function (err, data) {
                if (err) {
                    return res.end('404 Not Found')
                }
                res.end(data)
            })
        } else if (pathname === '/post') {
            fs.readFile('./views/post.html', function (err, data) {
                if (err) {
                    return res.end('404 Not Found')
                }
                res.end(data)
            })
        }else if(pathname === '/pinglun'){
            // 1.获取表单提交的数据parseObj.jquery
            // res.end(JSON.stringify(parseObj.query))
            var comment = parseObj.query
            // 2.将当前日期添加到数据对象中，然后存储到数据中
            var date = new Date()
            comment.dateTime = date.toLocaleDateString()
            comments.push(comment)
            // 3.让用户重定向跳转到首页
            res.statusCode = 302
            res.setHeader('location','/')
            res.end()
        } else {
            fs.readFile('./views/404.html', function (err, data) {
                if (err) {
                    return res.end('404 Not Found')
                }
                res.end(data)
            })
        }
    })
    .listen(3000, function () {
        console.log('running....')
    })