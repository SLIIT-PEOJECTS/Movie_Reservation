public class Topping {
    private int price;
    private String flavour;

    public void setPrice(int price){
        this.price = price;
    }
    public void setFlavour(String flavour){
        this.flavour = flavour;
    }

    public int getPrice(){
        return this.price;
    }

    public String getFlavour(){
        return this.flavour;
    }

}

class IceCream{
    int getPrice(int toppingPrice){
        return 100+toppingPrice;
    }
}

//class plainIceCream extends IceCream{
//    int getPrice(){
//        return 100;
//    }
//}
//
//class chocTopIceCream extends IceCream{
//    int getPrice(int toppinPrice){
//        return (100 + toppinPrice);
//    }
//}


class  VenderMachine{
    public static void main(String arg[]){
        Topping topping = new Topping();
        IceCream iceCream = new IceCream();
//        plainIceCream plainIceCream = new plainIceCream();
//        chocTopIceCream chocTopIceCream = new chocTopIceCream();

//        System.out.println("Normal IceCream ="+ (plainIceCream.getPrice()));

        topping.setFlavour("chocolate");
        topping.setPrice(100);
        int topPrice = topping.getPrice();

        System.out.println(topping.getFlavour() + "IceCream Price =");
        System.out.println(iceCream.getPrice(topPrice));


        topping.setFlavour("Whipped cream");
        topping.setPrice(350);
        topPrice = topping.getPrice();
        System.out.println(topping.getFlavour() + "IceCream Price =");
        System.out.println(iceCream.getPrice(topPrice));
    }
}