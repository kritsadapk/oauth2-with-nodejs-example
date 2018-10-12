
___
___

# ความรู้เบื้องต้นเกี่ยวกับ oAuth2
 
## OAuth2 คืออะไร
 
OAuth2 เป็นโปรโตคอลมาตรฐานสำหรับ Authorization ซึ่ง OAuth2 เป็นเวอร์ชันต่อของโปรโตคอลมาตรฐาน OAuth ที่สร้างขึ้นมาตั้งแต่ปี 2006 โดยที่ OAuth2 จะโฟกัสที่ความง่ายของการพัฒนาฝั่ง Client ขณะที่มีขั้นตอนการ Authorization เฉพาะสำหรับแอพพลิเคชัน Web, Desktop, Mobile และ IOT

## OAuth2 กำหนดให้มี 4 Roles ดังนี้

1. Resource Owner — User ที่ต้องการเข้าถึง resource ของ API
2. Resource Server — ที่เก็บ resource ของ API, ที่เราต้องรักษาความปลอดถัย
3. Client — เป็น application ที่ใช้งาน resource ของ API
4. Authorization Server — บริการอนุญาตให้เข้าถึง resource API ได้

## OAuth2 Token
* `Access Token` เป็น Token เพื่อส่ง Request ข้อมูล Token นี้จะมีเวลา life time น้อย ประมาณ ไม่เกิน 1 ชั่วโมง
* `Refresh Token` ใช้ในการข้อ access token ใหม่ token นี้จะไม่ใช่ token ที่ส่งไปร้องขอข้อมูล และเวลา life time จะนานหน่อย

## API = Microservice API Structure

![API = Microservice API](https://cdn-images-1.medium.com/max/800/1*En7I7KOXrutSwDCd1qVXLw.png "Title")

## ขั้นตอนของ OAuth2
1. Client ร้องขอไปยัง Resource Owner ว่าต้องการเข้าถึง Resource Server
2. เมื่อ Resource Ownerให้อนุญาต, Client จะได้รับ authorization grant ของ Resource Owner
3. Client ส่ง authorization grant ของ Resource Owner และ client credentials ไปยัง Autorization Server
4. ถ้า authentication สำเร็จ, Authorization Server จะส่ง access token กลับมา
5. Client เรียกไปหา Resource Server ด้วย access token สำหรับ authentication
6. ถ้า authentication สำเร็จ Resource Server จะ response เป็นข้อมูลที่ Client ต้องการ

## Endpoints and their purpose
* GET พยายามเข้าถึงข้อมูล [REST API] 
`` `GET http://localhost:8080/api/user/` `` แน่นอนว่าไม่มีสิทธิ์เข้าได้ 
* เข้าร้องขอ Access+Refresh Token โดย HTTP POST ที่ `/oauth2/token` พร้อมกับส่ง (Query Param)
   * grant_type=password
   * username= ???
   * password= ??? 

  `` `POST http://localhost:8080/oauth2/token?grant_type=password&username=bill&password=abc123` ``

* ร้องขอ Access Token ชุดใหม่ โดยใช้ Refresh Token โดยใช้ HTTP POST ใน Authorization Header พร้อมกับส่ง (Query Param)
   * grant_type=refresh_token 

  `` `POST http://localhost:8080/oauth2/token?grant_type=refresh_token&refresh_token=xxx` ``

* พยายามเข้าถึงข้อมูล โดยส่ง access token ไปด้วย ใน Header 

อ้างอิง: 
* http://websystique.com/spring-security/secure-spring-rest-api-using-oauth2/
* https://medium.com/@phayao/%E0%B8%A1%E0%B8%B2%E0%B8%9B%E0%B8%81%E0%B8%9B%E0%B9%89%E0%B8%AD%E0%B8%87-microservice-%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2-oauth2-%E0%B9%83%E0%B8%99-spring-boot-82dfd2252f47 

อ้างอิงเพิ่มเติม ความรู้+++
* https://tools.ietf.org/html/rfc6749


เพิ่มเติมเรื่อง node oauth2-server
* https://media.readthedocs.org/pdf/oauth2-server/latest/oauth2-server.pdf

___
รายละเอียดในโปรเจ็คนี้!!!
___

oAuth2 authorization server using Resource Owner Password Credentials Grant and a JWT bearer token
-----------------------------------------------------------------------------------------
This grant type is used where the client is trusted by the resource owner (the user) and has a client id and 
client secret known by this server.  *Trust* implies the user is willing to enter their username and password into the client, which 
usually means the client is issued or approved by the some organization that owns the authorization server.

eg. the Twitter IOS app issued by Twitter, but not a third-party app what authenticates against Twitter's API.

An IOS client use-case is:
* The user would enter their username and password into the client. These do not need to be stored by the client (but it can use the IOS keystore).
* The client authenticates (grant_type=password) against this server and receives an access token and refresh token. The
 client Id and client secret are also validated by this server.
* The client uses the access token for all subsequent requests (http header Authorization: bearer <token>)
* If the access token expires, the client requests a new one from this server (grant_type=refresh_token)
 and receives a new access token 
* The refresh token is retained by the client so the user doesn't have to login again. 
Once the refresh token has expired the user will need to login again (or start again using credentials in the keystore).

The access token is generated using JWT. The benefits of this token are:
* this server does not need to retain the tokens issued. It just needs to verify them.
* the token can be passed straight through to other servers (eg. microservers) that only need to verify it (ie. they trust the signed JWT)
* the token carries private claims that can be passed straight through to other servers (eg. user role/permission claims)
 
The refresh token is also using JWT, although this probably isn't necessary.

> โค้ดต้นฉบับจาก: https://github.com/thomseddon/node-oauth2-server/
>>  แก้ไขโค้ดโดย: Kritsada@OST

