import { test, expect, request } from '@playwright/test'

test('Create article', async({page,request}) =>{
    
 await page.goto('https://conduit.bondaracademy.com')
 await page.getByText('Sign in').click()
 await page.getByRole('textbox',{name:'Email'}).fill('chetana123@test.com')
 await page.getByRole('textbox',{name:'Password'}).fill('Chetana@123')
 await page.getByRole('button',{name:'Sign in'}).click()

 await page.getByText('New Article').click()
 await page.getByRole('textbox',{name:'Article Title'}).fill('Playwright is awesome')
 await page.getByRole('textbox',{name:'What\'s this article about?'}).fill('We can use APIs in playwright')
 await page.getByRole('textbox',{name:'Write your article (in markdown)'}).fill('Automate any web application in playwright')
 await page.getByRole('button',{name:'Publish Article'}).click()
 const createArticleResponse = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/')
 const articleResponseJSON = await createArticleResponse.json()
 console.log(await createArticleResponse.json());
 const slugID = articleResponseJSON.article.slug

 
 await expect(page.locator('.article-page h1')).toContainText('Playwright is awesome')
 await page.getByText('Home').first().click()
 //await expect(page.locator('.preview-link h1')).toContainText('Playwright is awesome')

 const loginResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login',{
    data:{"user":
        {"email":"chetana123@test.com",
            "password":"Chetana@123"}
        }
    })
 expect(loginResponse.status()).toEqual(200)
const responseLoginJSON = await loginResponse.json()
const token = responseLoginJSON.user.token

const deleteResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugID}`,{
headers:{
    authorization: `Token ${token}`
}
})
 expect(deleteResponse.status()).toEqual(204)

})