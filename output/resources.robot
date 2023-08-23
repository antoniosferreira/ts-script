*** Settings ***
Documentation	This is a resource file, that can contain variables and keywords.
Library	SeleniumLibrary

*** Variables ***

${APP_URL}	https://onlineboutique.dev
${Item1_element}    product/OLJCESPC7Z
${submit_button}    cymbal-button-primary
${email_field}    email
${street_field}    street_address
${zip_field}    zip_code
${city_field}    city
${state_field}	state
${country_field}	country
${creditCard_field}    credit_card_number
${cvv_field}	credit_card_cvv
${purchaseConfirmation_page}    https://onlineboutique.dev/cart/checkout

*** Keywords ***

Open App
	Open Browser	${APP_URL}	Chrome
	Maximize Browser Window
	Set Selenium Speed	0

Click On Element Item1_element
	SeleniumLibrary.Click Element	//a[contains(@href,'${Item1_element}')]

Click On Button submit_button
	SeleniumLibrary.Click Button	xpath=//button[contains(@class, '${submit_button}')]

Write on email_field
	[Arguments]	${value}
	SeleniumLibrary.Input Text	xpath=//input[contains(@name, '${email_field}')]	${value}

Write on street_field
	[Arguments]	${value}
	SeleniumLibrary.Input Text	xpath=//input[contains(@name, '${street_field}')]	${value}

Write on zip_field
	[Arguments]	${value}
	SeleniumLibrary.Input Text	xpath=//input[contains(@name, '${zip_field}')]	${value}

Write on city_field
	[Arguments]	${value}
	SeleniumLibrary.Input Text	xpath=//input[contains(@name, '${city_field}')]	${value}

Write on state_field
	[Arguments]	${value}
	SeleniumLibrary.Input Text	xpath=//input[contains(@name, '${state_field}')]	${value}

Write on country_field
	[Arguments]	${value}
	SeleniumLibrary.Input Text	xpath=//input[contains(@name, '${country_field}')]	${value}

Write on creditCard_field
	[Arguments]	${value}
	SeleniumLibrary.Input Text	xpath=//input[contains(@name, '${creditCard_field}')]	${value}

Write on cvv_field
	[Arguments]	${value}
	SeleniumLibrary.Input Text	xpath=//input[contains(@name, '${cvv_field}')]	${value}

Check On Page purchaseConfirmation_page
	Location Should Be	${purchaseConfirmation_page}

Close App
	Close Browser
