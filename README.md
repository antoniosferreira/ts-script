# Test Scripts Generator from US/AC

TL;DR: This scripts generates runnable test scripts for in RobotLanguage based on written user stories and acceptance criteria, written in the ITLingo RSL Excel template.

### Table of Contents

- [Installation](#installation)
- [Usage](#usage)

### Installation

To run the script, you need first to install typescript, node and npm in your machine:

```
brew install typescript && brew install node
```

The necessary dependencies for the project can be locally installed with npm:
```
npm install
```

To install RobotFramework, resort to the available version through pip3 and make sure you're installing the SeleniumLibrary as well:
```
pip3 install robotframework-seleniumlibrary 
```

Finally, to build the tool, execute:
```
npm run build
```

### Usage

1. Move your ITLingo excel to the `inputs` directory;
2. Execute
    ```
    npm run exec <name_excel_file>.xlsm
    ```

    The directory currently offers an example for testing purposes, OnlineBoutique.xlsm, which is based upon the requirements of the fictitous store [OnlineBoutique](https://onlineboutique.dev).
    ```
    npm run exec OnlineBoutique.xlsm
    ```
3. The generated files will be located under the output `directory`
4. Proceed to the refinment of the variables, both in the `resources.robot` for mapping GUI elements and all the unfulfilled variables across the tests. These are easily identified in the top of the files, with the `# To be filled` anotation. 

    The following mappings can be applied in the generated script files for the `OnlineBoutique` example.
    ```
    Resources.robot File:

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

    PurcahseCart.robot File:
    ${cvv}	322
    ```
5. To run the tests, make sure Google Chrome is installed in your machine. Then, to execute all tests, run:
    ```
    robot .
    ```

6. The result of the execution, as well as the attached logs can be found in the `output` directory as well. Open `report.html` for easier navigation through the results.