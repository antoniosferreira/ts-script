*** Settings ***
Documentation	A test suite for Purchase Cart
Resource	resources.robot
Default Tags	positive

*** Variables ***

${cvv}	322

*** Test Cases ***

Template Purchase Cart
	[Template]	Purchase Cart
	W2aoIgYjO@sfhgp.mds
	jU-dK7hCx@pfqed.mlf
	ZlT2P.z1q@cvylt.xkw


Template FailingPurchase Cart
	[Template]	Purchase Cart Failure
	qn9m}YhHZs?-`:}@:r@~}~z{z||.z{}~
	Y~`FJntwxQlVX?fO`.@}||{}~z|}z.~~{~~}
	{CjYKQoqrgsjTO|nE=@}z}}}z||}}.z{~~{~


*** Keywords ***

Purchase Cart
	[Arguments]	${email}
	Open App
	Click On Element Item1_element
	Click On Button submit_button
	Write on email_field	${email}
	Write on street_field	Avenida 5 de outubro
	Write on zip_field	1234
	Write on city_field		city
	Write on state_field		state
	Write on country_field		country
	Write on creditCard_field		5454-3232-1234-9878
	Write on cvv_field	${cvv}
	Click On Button submit_button
	Check On Page purchaseConfirmation_page
	Close App

Purchase Cart Failure
	[Arguments]	${email}
	Run Keyword And Expect Error	*	Purchase Cart		${email}