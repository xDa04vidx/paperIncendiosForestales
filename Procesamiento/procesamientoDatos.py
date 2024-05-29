import pandas as pd
import os
from datetime import datetime

directorio = os.getcwd()

dataNorte = pd.read_excel(os.path.join(directorio, "Procesamiento", "DatosNorte.xlsx"), sheet_name="Hoja1")
dataCentro = pd.read_excel(os.path.join(directorio, "Procesamiento", "DatosCentro.xlsx"), sheet_name="Hoja1")
dataOccidente = pd.read_excel(os.path.join(directorio, "Procesamiento", "DatosOccidente.xlsx"), sheet_name="Hoja1")
dataOriente = pd.read_excel(os.path.join(directorio, "Procesamiento", "DatosOriente.xlsx"), sheet_name="Hoja1")
dataSur = pd.read_excel(os.path.join(directorio, "Procesamiento", "DatosSur.xlsx"), sheet_name="Hoja1")

pesos = {
    "Oriente": 5,
    "Sur": 4,
    "Norte": 3,
    "Occidente": 2,
    "Centro": 1
}

suma_total = sum(pesos.values())
pesos_normalizados = [peso / suma_total for peso in pesos.values()]

columnasNorte = set(dataNorte.columns)
columnasCentro = set(dataCentro.columns)
columnasOccidente = set(dataOccidente.columns)
columnasOriente = set(dataOriente.columns)
columnasSur = set(dataSur.columns)
columnasUnicas = columnasNorte.union(columnasCentro, columnasOccidente, columnasOriente, columnasSur)

fechasUnicas = []

for data_set in [dataNorte, dataCentro, dataOccidente, dataOriente, dataSur]:
    fechasUnicas.extend(data_set['DateTime'].unique())

fechasUnicas = set(fechasUnicas)
fechasUnicas = [fecha.replace('24:00', '00:00') for fecha in fechasUnicas]
fechasUnicas = sorted(fechasUnicas, key=lambda x: datetime.strptime(x, '%d-%m-%Y %H:%M'))


nuevo_dataset = pd.DataFrame(index=fechasUnicas)
nuevo_dataset['DateTime'] = fechasUnicas  # Primera columna con las fechas

for columna in columnasUnicas:
    if columna == 'DateTime':
        continue  # Saltar la columna de fechas
    nuevo_dataset[columna] = "NaN"  # Inicializar todas las columnas con "NaN"

for columna in columnasUnicas:
    if columna != 'DateTime':
        print(columna)
        for fechaInteres in fechasUnicas:
            valorNuevo = 0
            sumaPesos = 0
            for data_set, peso in zip([dataOriente, dataSur, dataNorte, dataOccidente, dataCentro], pesos_normalizados):
                if columna in data_set.columns and fechaInteres in data_set['DateTime'].values:
                    valor = data_set.loc[data_set['DateTime'] == fechaInteres, columna].values[0]
                    if valor != "----":
                        valor = float(valor)
                        valorNuevo += valor * peso
                        sumaPesos += peso
            if sumaPesos != 0:
                valorNuevo = valorNuevo / sumaPesos
                nuevo_dataset.at[fechaInteres, columna] = valorNuevo

nuevo_dataset.to_csv("datosBogota.csv",index=False)