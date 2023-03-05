DROP VIEW if exists ${schema:raw}.population_sum  CASCADE;

CREATE OR REPLACE VIEW ${schema:raw}.population_sum AS 
    SELECT SUM((doc_record ->> 'Population')::int) AS years_2018_2019_2020
    FROM ${schema:raw}.api_data
    WHERE doc_record ->> 'Year' IN ('2018', '2019', '2020');
