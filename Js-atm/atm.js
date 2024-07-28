// ==================ATM==========================//

const prompt = require('prompt-sync')();
const user = []
let message = undefined

function isWeakPassword(password) {
    const minLength = 8;
    const upperCase = /[A-Z]/.test(password);
    const lowerCase = /[a-z]/.test(password);
    const digit = /\d/.test(password);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length < minLength || !upperCase || !lowerCase || !digit || !specialChar;
}


function isInteger(value){
    return Number.isInteger(Number(value))
}


while(true){
    console.clear()

    if(message != undefined){
        console.log('='.repeat(30))
        console.log(message)
        console.log('='.repeat(30))
    }

    console.log('1.Register\n2.Login\n3.Quit')
    console.log('='.repeat(30))

    const choice =prompt('Please enter your Choice: ')

    if(choice == '1'){
        console.clear()
        console.log('='.repeat(30))
        console.log('Welcome For Registration!!')
        console.log('='.repeat(30))

        let name = prompt("Enter Your Name:")
        name = name.trim();

        if(name != ''){
            let last_name  = prompt("Enter Your Last Name:");
            last_name = last_name.trim()

            if(last_name!="" && last_name!= ' '){
                let email = prompt("Enter Your Email:")
                email = email.trim()

                if (email.includes('@gmail.com')) {
                    let pass = prompt("Enter Your Password:")

                    if(!isWeakPassword(pass)){
                            let amount = prompt("Enter amount:")
                            amount = amount.trim();

                            if(isInteger(amount)&& amount>0){
                                let exist = false;
                                for(let i =0 ; i<user.length; i++){
                                    if(user[i].email === email){
                                        exist = true;
                                        break
                                    }
                                }
                                if(exist == true){
                                        message = 'User Already Exist!!'

                                }
                                else{
                                    user.push({
                                    "first_name":name,
                                    "last_name":last_name,
                                    'email':email,
                                    'pass':pass,
                                    'amount':parseInt(amount)

                                    })
                                    message = 'User Registered!!'

                                }
                            }else{
                                message="Enter a valid amount!!"
                            }

                }else
                        message = 'Weak Password! Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a digit, and a special character.'

                }else{
                    message = `Invalid emial ${email}`
                }
            }else{
                message = 'Invalid last name'
            }
        }else{
            message = 'Enter a valid name'
        }


    }else if(choice == '2'){
        console.clear()
        console.log('='.repeat(30))
        console.log('Welcome For Login!!')
        console.log('='.repeat(30))
        const name = prompt("Enter Your Email:")
        const password= prompt("Enter your Password:")
        let exist = false
        user_name = []
        for(let i =0 ; i<user.length; i++){
            if(user[i].email === name && user[i].pass === password){
            exist = true;
            user_name.push(user[i].first_name,
                           user[i].amount)
            break
            }

        }
        if(exist === false){
            message = 'Invalid Login info'

        }else{
            console.clear()
            let message1 = undefined
            console.clear()
            console.log('='.repeat(30))
            console.log(`Welcome ${user_name[0]}`)
            console.log('='.repeat(30))

            while(true){

                if(message1 != undefined){
                    console.log('='.repeat(30))
                    console.log(message1)
                    console.log('='.repeat(30))

                }
                console.log('1.With-Drawal\n2.Deposit\n3.Check-Balance\n4.Send-Money\n5.Log-Out')
                console.log('='.repeat(30))
                choice1 = prompt("Enter Your Choice:")

                if(choice1 == '5'){
                    message = 'Log-Out successfully'
                    break
                }else if(choice1 == '1'){
                    console.clear()
                    console.log('='.repeat(30))
                    console.log("Welcom for With-Drawal!!")
                    console.log('='.repeat(30))
                    let money = prompt("Enter the amount that you want to With-Drawal:")

                    if(isInteger(money)&& money>0){

                            for(let users = 0;users<user.length;users++){
                                if(user[users].email==name){

                                    if(user[users].amount>=money){
                                        amount = parseInt(user[users].amount)-parseInt(money)
                                        user[users].amount = amount
                                        console.clear()
                                        message1 = `Rs${money} With-Drawal successfully.Now your Remaing Balance is Rs${user[users].amount}`

                                }else{
                                    console.clear()
                                    message1 = 'Low Balance'
                                }
                                }

                            }

                    }else{
                        message1='Enter a valid amount!!'
                        console.clear()
                    }

                }else if(choice1 === '3'){
                    for(let n = 0;n<user.length;n++){
                        if(user[n].email=== name){
                            console.clear()
                            if(user[n].amount==0){

                            message1 = `Mr.${user[n].first_name}!! Your remaning  Bank Account Balcance is Rs${user[n].amount}\nRecharge your Account`

                            }else{
                                message1 = `Mr.${user[n].first_name}!! Your remaning  Bank Account Balcance is Rs${user[n].amount}`
                            }
                        }
                    }

                }else if(choice1 == '2'){
                    console.clear()
                    console.log('='.repeat(30))
                    console.log("Welcom for Deposit money!!")
                    console.log('='.repeat(30))
                    let money = prompt("Enter the amount that you want to Deposit:")
                    if(isInteger(money)&& money>0){

                            for(let users = 0;users<user.length;users++){
                                if(user[users].email==name)
                                    amount = parseInt(user[users].amount)+parseInt(money)
                                    user[users].amount = amount
                                    console.clear()
                                    message1 = `Rs${money} Deposited successfully in your account.Now Your updated Balance is Rs${user[users].amount}`

                            }
                    }else{
                        console.clear()
                        message1 ='Invalid amount';

                    }
                }else if(choice1=='4'){
                    console.clear()
                    console.log('='.repeat(30))
                    console.log("Welcom in Send-Money Option!!")
                    console.log('='.repeat(30))
                    const pay = prompt("Enter the amount that you want to Send:")
                    let cash = false;
                    let found = false;
                    if(isInteger(pay)&& pay>0){
                        for(let users = 0;users<user.length;users++){
                            if(user[users].email==name ){

                                if(user[users].amount>=pay){
                                    const recip = prompt("Enter the Recipient Email:")
                                    for(let rec = 0;rec<user.length;rec++){
                                        if(user[rec].email==recip){
                                            found = true;
                                            const pin = prompt("Enter Your password:")
                                            if(pin === user[users].pass){
                                                let amount = parseInt(user[users].amount)-parseInt(pay)
                                                user[users].amount = amount
                                                let amount1 = parseInt(user[rec].amount)+parseInt(pay)
                                                user[rec].amount = amount1
                                                console.clear()
                                                message1 = `Rs${pay} Transferred  Successfully to ${recip}.\nNow Your Balcance is Rs${user[users].amount}!!`

                                            }else{
                                                console.clear()
                                                message1 = 'Wrong Password.\nTry Again!!'
                                            }
                                        }else if(found!=true){
                                            console.clear()
                                            message1= 'No Recipient Founded\nTry Again!!'
                                        }
                                    }

                                    cash = true
                                }else if(cash!=true){
                                    console.clear()
                                    message1 = 'Low Account-Balcance'
                                }

                            }

                }
                    }else{
                    console.clear()
                    message1 = 'Invalid Amount!!'
                }


                }else{
                    console.clear()
                    message1= "Enter a Valid choice"
                }



        }
        }

    }else if(choice =='3'){
        console.clear()
        console.log('='.repeat(30))
        console.log("BY BY!!!")
        console.log('='.repeat(30))
        break

    }else{
        message = "Invalid Choice\nRead MANUE Carefully"
    }


}
