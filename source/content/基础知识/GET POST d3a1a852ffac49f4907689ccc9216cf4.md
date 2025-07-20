# GET/POST

Owner: yancy yu

GET 和 POST 的区别

1.get 提交的数据会放在 URL 之后，并且请求参数会被完整的保留在浏览器的记录里，由于参数直接暴露在 URL 中，可能会存在安全问题，因此往往用于获取资源信息。而 post 参数放在请求主体中，并且参数不会被保留，相比 get 方法，post 方法更安全，主要用于修改服务器上的资源。

2.get 请求只支持 URL 编码，post 请求支持多种编码格式。

3.get 只支持 ASCII 字符格式的参数，而 post 方法没有限制。

4.get 提交的数据大小有限制（这里所说的限制是针对浏览器而言的），而 post 方法提交的数据没限制

5.get 方式需要使用 Request.QueryString 来取得变量的值，而 post 方式通过 Request.Form 来获取。