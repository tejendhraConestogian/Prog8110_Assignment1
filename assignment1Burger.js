const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    BBQSauce:   Symbol("bbqsauce"),
    FSIZE: Symbol("fsize"),
    FKETCHUP: Symbol("fketchup"),
    CHICKEN:  Symbol("chicken")
});

module.exports = class BurgerOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sBBQSauce = "";
        this.sCHICKEN = "";
        this.sItem = "burger";
        this.Price=0;
        this.fSize="";
        this.fKetchup="";
        this.fItem= "fries";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("Welcome to Tj's Fire Place, where burgers and fries are from FIRE of HELL");
                aReturn.push("What size Burger would you like? Small: $4, Medium: $6, Large: $8");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.BBQSauce
                this.sSize = sInput;
                if(sInput.toLocaleLowerCase()=="small")
                {
                    this.Price+=4;
                    aReturn.push("Do you want an extra patty for $1?");
                }
                else if(sInput.toLocaleLowerCase()=="medium")
                {
                    this.Price+=6;
                    aReturn.push("Do you want an extra patty for $1?");
                }
                else if(sInput.toLocaleLowerCase()=="large")
                {
                    this.Price+=8;
                    aReturn.push("Do you want an extra patty for $1? (yes/no)");
                }
                else{
                    aReturn.push("please enter appropriate Size");
                    this.stateCur = OrderState.SIZE;
                }
               
                break;
            case OrderState.BBQSauce:
                this.stateCur = OrderState.FSIZE
                this.sBBQSauce = sInput;
                if(sInput.toLocaleLowerCase()=="yes")
                {
                    this.Price+=1;
                }
                aReturn.push("What size fries would you like? Small:$2, Medium: $3, Large: $4");
                break;

            case OrderState.FSIZE:
                this.stateCur = OrderState.FKETCHUP
                this.fSize = sInput;
                if(sInput.toLocaleLowerCase()=="small")
                {
                     this.Price+=2;
                 }
                else if(sInput.toLocaleLowerCase()=="medium")
                 {
                     this.Price+=3;
                 }
                else if(sInput.toLocaleLowerCase()=="large")
                 {
                     this.Price+=4;
                }
                else{
                    aReturn.push("please enter appropriate Size");
                    this.stateCur = OrderState.FSIZE;
                    break;
                }
                aReturn.push("Do you want Ketchup for $1? (yes/no)");
                break;

            case OrderState.FKETCHUP:
                this.stateCur = OrderState.CHICKEN
                this.fKetchup = sInput;
                if(sInput.toLocaleLowerCase()=="yes")
                {
                    this.Price+=1;
                }
                aReturn.push("Would you like fried chicken for $8?(Yes/No)");
                break;

            case OrderState.CHICKEN:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sCHICKEN = sInput;
                    this.Price+=8;
                }
                aReturn.push(`Thank-you for your order of $ ${this.Price} `);
                if(this.sBBQSauce.toLocaleLowerCase()=="yes"){
                aReturn.push(`${this.sSize} ${this.sItem} with BBQ Sauce`);
                }
                else{
                aReturn.push(`${this.sSize} ${this.sItem} with no BBQ Sauce`);
                }
                if(this.fKetchup.toLocaleLowerCase()=="yes"){
                    aReturn.push(`${this.fSize} ${this.fItem} with ketchup`);
                    }
                    else{
                    aReturn.push(`${this.fSize} ${this.fItem} with no ketchup`);
                    }
                if(this.sCHICKEN){
                aReturn.push(`With Fried Chicken`);
                }
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
            default : 
            this.stateCur = OrderState.SIZE;
            aReturn.push("Welcome to Tj's Fire Place, where burgers and fries are from FIRE of HELL");
            aReturn.push("What size Burger would you like? Small: $4, Medium: $6, Large: $8");
            break;
        }
        return aReturn;
    }
}