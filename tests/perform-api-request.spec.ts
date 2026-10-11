import { test, expect, request } from '@playwright/test'


test('Delete article', async({page, request}) =>{
    const loginResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login',{
    data:{"user":
        {"email":"chetana123@test.com",
            "password":"Chetana@123"}
        }
})
expect(loginResponse.status()).toEqual(200)
const responseLoginJSON = await loginResponse.json()
const token = responseLoginJSON.user.token
console.log(responseLoginJSON)
console.log(token)

const newArticleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/',{
    data:{
    "article": {
        "title": "test1",
        "description": "test desc1",
        "body": "test body1",
        "tagList": []
    }
},
headers:{
    authorization: `Token ${token}`
}
 })
 //await expect(newArticleResponse.status()).toEqual(201)

 await page.goto('https://conduit.bondaracademy.com')
 await page.getByText('Sign in').click()
 await page.getByRole('textbox',{name:'Email'}).fill('chetana123@test.com')
 await page.getByRole('textbox',{name:'Password'}).fill('Chetana@123')
 await page.getByRole('button',{name:'Sign in'}).click()

 await expect(page.locator('.preview-link h1')).toContainText('Test title')
 await page.getByText('Test title').click()
 await page.getByRole('button',{name:'Delete Article'}).first().click()
 await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0')
 await expect(page.locator('.preview-link h1')).not.toContainText('Test title')





})