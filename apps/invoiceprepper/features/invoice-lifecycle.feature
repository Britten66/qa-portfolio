Feature: Invoice lifecycle
  As a signed in user
  I want to create and cancel invoices from the dashboard
  So I can manage my billing without losing work in progress

  Background:
    Given I am on the dashboard

  Scenario: Open the new invoice form
    When I click new invoice
    Then the invoice form is visible

  Scenario: Cancel discards the new invoice form
    When I click new invoice
    And I cancel the form
    Then the invoice form is closed

  Scenario: Fill in client and line item
    When I click new invoice
    And I enter client "Acme Cleaning Co" and item "Spring deep clean"
    Then the form keeps the values I typed
