package co.rxstack.mlstack.client.cucumber.stepdefs;

import co.rxstack.mlstack.client.ClientApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = ClientApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
