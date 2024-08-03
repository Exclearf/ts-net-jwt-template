import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Documentation</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className={styles.wrapper}>
                <NavigationMenuLink
                  className={[styles.item, styles.item1].join(" ")}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>C# .NET</CardTitle>
                      <CardDescription>First choice</CardDescription>
                    </CardHeader>
                  </Card>
                </NavigationMenuLink>
                <NavigationMenuLink
                  className={[styles.item, styles.item2].join(" ")}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Python</CardTitle>
                      <CardDescription>
                        Staying up with the current trends
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </NavigationMenuLink>
                <NavigationMenuLink
                  className={[styles.item, styles.item3].join(" ")}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Web</CardTitle>
                      <CardDescription>
                        The time I have fallen in love...
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>About Me</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>
                <Card>
                  <CardHeader>
                    <CardTitle>My Story</CardTitle>
                    <CardDescription>How did we get here?</CardDescription>
                  </CardHeader>
                </Card>
              </NavigationMenuLink>
              <NavigationMenuLink>
                <Card>
                  <CardHeader>
                    <CardTitle>Hobbies</CardTitle>
                    <CardDescription>Don't we all have some?</CardDescription>
                  </CardHeader>
                </Card>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Dashboard
          </NavigationMenuLink>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Contact Me
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Home;
