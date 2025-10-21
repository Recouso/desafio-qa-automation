Feature: Gerenciar registros dinâmicos no submenu Web Tables

  Como QA no Desafio Frontend - Parte 2
  Quero criar, editar e deletar múltiplos registros com dados aleatórios
  Para validarem os meus conhecimentos utilizando Cucumber

  Background:
    Given que estou na página inicial do DemoQA

  Scenario: Criar, editar e deletar 12 registros usando dados faker
    When eu acesso o submenu Web Tables
    And eu crio 12 novos registros com dados aleatórios
    And eu edito cada registro criado adicionando o sufixo Editado
    And eu deleto todos os registros criados
    Then nenhum dos registros deve estar visível na tabela
